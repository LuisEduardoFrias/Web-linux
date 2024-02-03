
import AppMetaData from 'md/app_meta_data'

export default class Dock {
 
 apps: AppMetaData[];
 
 constructor( apps: AppMetaData[]) {
 
  this.apps = apps;
 }
}