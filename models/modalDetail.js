export const detailProduct = (product)=>{
    let contentDetail = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> ${product.tenSP}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
               <div class="row ">
        <div class="col-5 text-center">
            
            <div>
                <img src="${product.hinhAnh}" style=" max-width: 100%; height: 200 " />
            </div>
        </div>
        <div class="col-7 text-left">
            <h3> Thông số kỹ thuật</h3>
            <table class="table " style="font-size: 12px">
                <tr>
                    <th> Màn Hình </th>
                    <th>${product.manHinh} </th>
                </tr>
                <tr>
                    <th> Hệ điều hành</th>
                    <th>${product.heDieuHanh} </th>
                </tr>
                <tr>
                    <th> Camera Trước</th>
                    <th>${product.cameraTruoc} </th>
                </tr>
                <tr>
                    <th> Camera Sau </th>
                    <th>${product.cameraSau} </th>
                </tr>
                <tr>
                    <th>Ram </th>
                    <th>${product.ram} </th>
                </tr>
                <tr>
                    <th> Rom</th>
                    <th>${product.rom} </th>
                </tr>
            </table>
        </div>
    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btn-buy" data-product='${JSON.stringify(product)}' data-dismiss="modal">Thêm vào giỏ</button>
            </div>
        </div>
    </div>
</div>
`
return contentDetail;

}