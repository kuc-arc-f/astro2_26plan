<script lang="ts">
import CrudIndex from "./CrudIndex";
import Plan from "./Plan";
import moment from 'moment'
import LibCommon from '../../lib/LibCommon';
import IndexRow from './IndexRow.svelte';
//
let items = [], itemsTodos = [];
let weeks = null, month = null, month_str = "";
/**
*
* @param
*
* @return
*/
const get_items = async function(target_month) {
    try{
        console.log("#get_items");
        weeks = Plan.get_week_items(target_month);
        month_str = target_month.format('YYYY-MM');
        itemsTodos = await CrudIndex.getList(target_month);
        itemsTodos = await Plan.convertDateType(itemsTodos);
//console.log(itemsTodos);
        const weeksData = Plan.convert_week_array( weeks, itemsTodos ,moment() ) 
        weeks = weeksData;
//console.log(weeks);
    } catch (e) {
        console.error(e);
    }   
} 

/**
*
* @param
*
* @return
*/
const startProc= async function() {
    try{
        console.log("#startProc");
        month = moment();
        await get_items(month)
    } catch (e) {
        console.error(e);
    } 
}
startProc();
//
const changeBefore = async function () {
    try{
        console.log("#startProc");
        const sub = month.add(-1, 'month').startOf('month')
//console.log( sub )        
        await get_items(sub)
    } catch (e) {
        console.error(e);
    } 
}
//
const changeAfter = async function () {
    try{
        console.log("#changeAfter");
        const sub = month.add(1, 'month').startOf('month')
//console.log( sub )        
        await get_items(sub)
    } catch (e) {
        console.error(e);
    } 
}
</script>

<!-- MarkUp -->
<div class="mb-4 pb-4">
    <div class = "row mt-2">
        <div class="col-md-6"><h1>Plan: {month_str}</h1></div>
        <div class="col-md-6 text-end">
            <button on:click={changeBefore} class="btn btn-outline-primary">
            <i class="fas fa-arrow-circle-left"></i> Before
            </button>
            <button on:click={changeAfter} class="btn btn-outline-primary ml-2">
                Next <i class="fas fa-arrow-circle-right"></i>
            </button>            
        </div>
    </div>
    <p></p>
    <hr class="my-1" />	
    <a href={`/plan/create`} class="btn btn-primary">Create</a>
    <hr class="my-1" />	
    <div class="table_box_wrap mb-4">
        <table class="table table-bordered mt-2">
            <thead>
            <tr>
                <th class="th_sun text-danger text-center">Sun</th>
                <th class="text-center">Mon</th>
                <th class="text-center">Tue</th>
                <th class="text-center">Wed</th>
                <th class="text-center">Thu</th>
                <th class="text-center">Fri</th>
                <th class="th_sat text-primary text-center">Sat</th>
            </tr>      
            </thead>
            <tbody>
            {#each weeks as object, i}
            <tr>
                <IndexRow object={object.weekItem} />
            </tr>
            {/each}            
            </tbody>
        </table>    
    </div>
</div>

<style>
.table .td_cls{
  width : 80px;
  min-height : 180px;
}
</style>

<!--
-->