import Point from 'md/point'
import Size from 'md/size'
import AppMetaData from 'md/app_meta_data'

export default class Menu {
 point: Point;
 size: Size;
 app: AppMetaData[];
 
 constructor(point: Point, size: Size, app: AppMetaData[]) {
  this.point = point;
  this.size = size;
  this.app = app;
 }
}