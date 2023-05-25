import LibCrud from '../../lib/LibCrud';
import Crud from './Crud';
import LibConfig from '../../lib/LibConfig';
import HttpCommon from '../../lib/HttpCommon';
//
const CrudEdit = {
  /**
   *
   * @param key: any
   *
   * @return
   */
  update : async function() : Promise<any>
  {
    try{
      let ret = false;
      const elm: any = document.querySelector('#item_id');
      const id = elm?.value;
      const content = (<HTMLInputElement>document.querySelector("#content")).value;
      const values: any = {}; 
//      let values = Crud.getInputValues();  
      values.id = Number(id);
      values.content = content;
  console.log(values);
//  return;
      const json = await HttpCommon.server_post(values, '/plan/update');
      console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      } 
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , update');
    }
  },
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //
      const hid_completed: any = document.querySelector('#item_completed');
      const hid_completed_value = hid_completed?.value;      
      const completed = (<HTMLInputElement>document.querySelector("#completed"));
      if(Number(hid_completed_value) === 1) {
        completed.checked = true;
      }
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async() => {
        const res = await this.update();
console.log("res=", res);
      if(res) {
        window.location.href = '/plan';	
      }
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
CrudEdit.startProc();

export default CrudEdit;
