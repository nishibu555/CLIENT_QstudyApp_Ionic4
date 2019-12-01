import { Component, OnInit } from '@angular/core';
import { QustadyService } from '../service/qustady.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';



@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.page.html',
  styleUrls: ['./question-answer.page.scss'],
})
export class QuestionAnswerPage implements OnInit{
  
  revision_mode=false;
  user_id= null;
  module_id = null;
  module_name='';
  module_type = null;
  //current question index
  qIndex=0;
  submitAttempt = false;
  form: FormGroup;
  all_question=[];
  progress_card=[];
  total_mark=0;  
  show_mark=false;
  //for mcq option
  alphabets='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(
    private tts: TextToSpeech,
    private serv:QustadyService, 
    private route:ActivatedRoute,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private storage:Storage,
    private router:Router
  ){
    this.form = formBuilder.group({
      ans: ['',Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.storage.get('qIndex_to_revise').then(res=>{
      if(res != null){
        this.revision_mode=true;
        this.qIndex=res;
      }
    })

    this.module_id=this.route.snapshot.paramMap.get('moduleId');

    this.storage.get('qstudy_user').then(user=>{
        this.user_id=user.id;
        const data={
          action: 'get_question_by_module',
          module_id: this.module_id,
        }
        this.serv.commonFunctionCall(data).subscribe(res=>{
            this.module_name=res.module_name;
            this.module_type=res.module_type;
            this.all_question=res.all_question;
            this.total_mark=res.total_mark;
            
            if(this.qIndex < this.all_question.length-1){
                const progress=[];
                for(let i=0; i<res.all_question.length; i++){
                  const mark={
                    obtained:null
                  }
                  progress.push(mark);
                }
                this.progress_card=progress;
            }
        });
    })
  }
  

 //student's ans for type 3 question
   vocubulary_ans(){
    this.submitAttempt=true;
    if(!this.form.valid){
       return;
    }
    else{
      if(this.all_question[this.qIndex].answer != this.form.value.ans){
        this.process_answer(this.all_question[this.qIndex].questionType,false);
      }
      else{ 
        this.process_answer(this.all_question[this.qIndex].questionType,true);           
      }
    }
    this.form.reset();
    this.submitAttempt=false;
  }

  // for  type 4
  mc_ans(ans:any){
     if(this.all_question[this.qIndex].answer != ans.detail.value){
       this.process_answer(this.all_question[this.qIndex].questionType,false);
     }
     else{
       this.process_answer(this.all_question[this.qIndex].questionType,true);
     }
  }  

  //for  type 7 
  students_ans=[];
  qus_index=null;
  ans_index=null;
  question_side(ans:any){
    this.qus_index=ans.detail.value;
  }
  ans_side(ans:any){
    this.ans_index=ans.detail.value;
    this.students_ans[this.ans_index]=this.qus_index;
  }
  macthing_ans(){ 
    const tutors_ans=JSON.parse(this.all_question[this.qIndex].answer);
    if(JSON.stringify(tutors_ans)==JSON.stringify(this.students_ans)){
      this.process_answer(this.all_question[this.qIndex].questionType,true);
    }
    else{
      this.process_answer(this.all_question[this.qIndex].questionType,false);
    }
  }


  process_answer(qusetionType:any,isCorrect:any){
    if(isCorrect==false){
        const mark={ obtained:0 }
        this.progress_card[this.qIndex] = mark; 

        let subHeader:'';
        let message='';

        if(qusetionType==3){
           subHeader= this.all_question[this.qIndex].answer;
           message= this.all_question[this.qIndex].questionName.definition;
        }

        if(qusetionType==4){
          // message= '<div [innerHTML]="'+this.all_question[this.qIndex].questionName.question_solution+'"></div>';
        }
        
        if(qusetionType==7){
          //set correct ans
        }

        const alert_data={
            header: 'Wrong Answer !',
            subHeader: subHeader,
            message: message,
            button: 'Close'
        }
        this.alert(alert_data);
    }
    else{
        //ans is correct, 
        //add obtained marks to progress card.if the qstn is not answerd before. 
        if(this.progress_card[this.qIndex].obtained == null){  
          const mark={obtained:this.all_question[this.qIndex].questionMarks}
          this.progress_card[this.qIndex]= mark; 
        }
        
        //IF rivision mode, remove qIndex_to_revise and update wrong_ans_index. then set revision mode to false and go to result page 
        if(this.revision_mode==true){
            this.storage.set('qIndex_to_revise', null).then(()=>{
               this.storage.get('wrong_ans_index').then(res=>{
                  res.splice(res.indexOf(this.qIndex), 1)
                  this.storage.set('wrong_ans_index', res ).then(()=>{
                    this.revision_mode=false; 
                    let action= 'show_result';
                    const alert_data={
                      action: action,
                      message: 'Your answer is correct. See result ?',
                      button: 'OK'
                    }
                    this.alert(alert_data);
                    this.router.navigateByUrl('/show-result/'+this.module_id);
                  })
               })
            })
        }
        else{
         //go for next question until last question 
          let action= 'get_next_question';
          if(this.qIndex == this.all_question.length-1){
              action='save_all_mark';
          }
          const alert_data={
            action: action,
            q_index: this.qIndex,
            message: 'Your answer is correct. See Next ?',
            button: 'OK'
          }
          this.alert(alert_data);
        }
    }
  }

  
  async alert(data){
    this.submitAttempt=false;
    let header='';
    let subHeader='';
    let message='';
    if(data.header){ header=data.header }
    if(data.subHeader){ subHeader=data.subHeader }
    if(data.message){ message=data.message }

    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      
      buttons: [
        { 
          text: data.button,
          handler: () => {
            if(data.action){
              if(data.action =='get_next_question'){
                this.qIndex=data.q_index+1;
              }
              else if(data.action =='save_all_mark'){
                  let result={
                    module_name:  this.module_name,
                    module_type:  this.module_type,
                    total_mark: this.total_mark,
                    detail:[]
                  };
                  let wrong_ans_index=[];
                  for(let i=0; i<this.progress_card.length; i++){
                      const data={
                        index: i,
                        qstn_sl: this.all_question[i].question_order,
                        mark: this.all_question[i].questionMarks,
                        obtained: this.progress_card[i].obtained
                      }
                      result.detail.push(data);
                      if(this.progress_card[i].obtained==0){
                        wrong_ans_index.push(i);
                      }
                  }
                  this.storage.set('result_'+this.user_id, result).then(()=>{
                    this.storage.set('wrong_ans_index', wrong_ans_index).then(()=>{
                      this.router.navigateByUrl('/show-result/'+this.module_id);
                    })
                  })
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  
  speak(){
    this.tts.speak('Hello World')
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  show_hint(hint){
    const alert_data={
      message:hint,
      button: 'Close'
    }
    this.alert(alert_data);
  }


}