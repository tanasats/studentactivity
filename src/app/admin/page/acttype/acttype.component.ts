import { IActtype } from 'src/app/interface/acttype';
import { ActtypeService } from 'src/app/service/acttype.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-acttype',
  templateUrl: './acttype.component.html',
  styleUrls: ['./acttype.component.css'],
})
export class ActtypeComponent implements OnInit {
  public items: IActtype[] = [];
  public closeResult: string = '';

  public page: number = 1;
  public pagesize: number = 10;
  public keyword: string = '';

  public itemsfound: number = 0;
  public pagetotal: number = 0;
  public loading: boolean = false;

  constructor(
    private acttypeService: ActtypeService,
    private notifyService: NotificationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  searchkeydown(event: any) {
    if (event.key === 'Enter') {
      console.log(this.keyword);
      this.getItems();
    }
  }

  getItems() {
    this.loading=true;
    //this.acttypeService.getAll().subscribe({
    this.acttypeService
      .filter({
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
      })
      .subscribe({
        next: (v) => {
          this.loading=false;
          console.log(v);
          this.pagetotal = v.totalpage;
          this.itemsfound = v.itemscount;
          this.items = v.items;
          if (this.page > this.pagetotal && this.itemsfound) this.changepage(this.page - 1);
        },
        error: (e) => {
          this.notifyService.show('error', e, '');
        },
      });
  }

  onDelete(id: any) {
    console.log('onDelete(' + id + ')');
    this.acttypeService.delete(id).subscribe({
      next: (v) => {
        console.log(v);
        if (v.affectedRows == 1) {
          this.notifyService.show('success', 'ลบข้อมูลแล้ว', '');
          this.getItems();
        }
      },
      error: (e) => {
        console.log('onDelete() error:', e);
        this.notifyService.show('error', 'ผิดพลาด:' + e, '');
      },
      complete: () => {},
    });
  }

  deleteItem(item: IActtype) {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.title = 'ยืนยันลบข้อมูล';
    modalRef.componentInstance.content =
      'รหัส ' + item.acttype_id + ' ' + item.acttype_name;
    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result == 'Ok') {
          this.items.forEach((el, index) => {
            if (el.acttype_id == item.acttype_id) {
              this.onDelete(item.acttype_id);
            }
          });
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  changepage(pageno: number) {
    console.log('set page ' + pageno);
    if (pageno < 1) {
      this.page = 1;
    } else {
      this.page = pageno;
    }
    this.getItems();
  }
  
  previouspage() {
    if (this.page > 1) {
      this.page--;
      this.getItems();
    }
  }
  nextpage() {
    if (this.page < this.pagetotal) {
      this.page++;
      this.getItems();
    }
  }
} //class
