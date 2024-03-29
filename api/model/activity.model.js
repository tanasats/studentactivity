const db = require("../config/db");

class _class { 

  getAll() {
    const sql = db.format("SELECT * FROM activity");
    return db.execute(sql);
  }
  getById({id = ""}) {
    const sql = db.format("SELECT * FROM activity WHERE activity_id = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    const ref1 = "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_statuscode')";
    const sql = db.format("SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN "+ref1+" ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_name like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    console.log(sql);
    return db.query(sql);
  }
  current({page,pagesize}){  //activity_statuscode=1  (เปิด)
    const ref1 = "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_statuscode')";
    const sql = db.format("SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN "+ref1+" ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_statuscode like ? LIMIT ?,?", [1,(page-1)*pagesize,pagesize]);
    console.log(sql);
    return db.query(sql);
  }

  countfilter({keyword}) {
    const sql = db.format("SELECT count(*) as value FROM activity WHERE activity_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }
  
  countCurrent({keyword}) {
    const sql = db.format("SELECT count(*) as value FROM activity WHERE activity_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  getRegisterUsers({id}){
    const user_columns =",username,studentcode,msuid,email,displayname,prefixname,fname,mname,sname,faculty_id,faculty_name";
    const sql = db.format("SELECT register.*"+user_columns+" FROM register LEFT JOIN user ON register.user_id=user.user_id WHERE activity_id=?",[id]);
    return db.query(sql);
  }

  getuseractivity({id}){
    const sql = db.format("SELECT * FROM register LEFT JOIN activity ON register.activity_id=activity.activity_id WHERE user_id=?",[id]);
    console.log(sql);
    return db.query(sql);
  }
  create({ datas }) {
    const sql = db.format("INSERT INTO activity SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    const sql = db.format("UPDATE activity SET ? WHERE activity_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM activity WHERE activity_id=?", [id]);
    return db.execute(sql);
  }
  updatePoster({id,filename,caption}){
    const sql = db.format("UPDATE activity set activity_poster=?,activity_caption=? where activity_id=?",[filename,caption,id]);
    console.log(sql);
    return db.execute(sql);
  }

}//class

const ClassModel = new _class();
module.exports = ClassModel;
