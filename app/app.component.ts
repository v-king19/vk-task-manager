import { Component, signal, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
type Item={id?:number,title:string,details?:string,status?:string,createdAt?:string,updatedAt?:string}
@Component({
  selector:'app-root',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent{
  private http=inject(HttpClient)
  private fb=inject(FormBuilder)
  items=signal<Item[]>([])
  api='http://localhost:8080/api/items'
  editingId=signal<number|null>(null)
  form=this.fb.group({title:['',Validators.required],details:[''],status:['OPEN']})
  filtered=computed(()=>this.items())
  load(){this.http.get<Item[]>(this.api).subscribe(d=>this.items.set(d))}
  ngOnInit(){this.load()}
  reset(){this.form.reset({title:'',details:'',status:'OPEN'});this.editingId.set(null)}
  submit(){if(this.form.invalid)return;const v=this.form.value as Item;if(this.editingId()){this.http.put<Item>(`${this.api}/${this.editingId()}`,v).subscribe(_=>{this.load();this.reset()})}else{this.http.post<Item>(this.api,v).subscribe(_=>{this.load();this.reset()})}}
  edit(i:Item){this.editingId.set(i.id||null);this.form.patchValue({title:i.title,details:i.details||'',status:i.status||'OPEN'})}
  remove(i:Item){if(!i.id)return;this.http.delete(`${this.api}/${i.id}`).subscribe(_=>this.load())}
}
