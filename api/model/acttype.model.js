const db = require("../config/db");

class _class { 

  getAll() {
    let sql = db.format("SELECT * FROM acttype");
    return db.execute(sql);
  }
  getById({id = ""}) {
    let sql = db.format("SELECT * FROM acttype WHERE acttype_id = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    let sql = db.format("SELECT * FROM  acttype WHERE acttype_name like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }
  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM acttype WHERE acttype_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    let sql = db.format("INSERT INTO acttype SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    let sql = db.format("UPDATE acttype SET ? WHERE acttype_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM acttype WHERE acttype_id=?", [id]);
    return db.execute(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
