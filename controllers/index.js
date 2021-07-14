import { products } from '../data/products.js';
import { detailProduct } from '../models/modalDetail.js'
import { cartItem } from '../models/modelCart.js'

// IMPORT LODASH 
let sortLodash = window._.sortBy

//FUNCTION LẤY SELECTOR
function QS(ele) {
    return document.querySelector(ele)
}

// HIỂN THỊ DANH SÁCH SẢN PHẨM THEO MẢNG VÀ KEYWORD
const showProducts = (arrData, keyword) => {
    var html = '';
    if (arrData) {
        if (keyword) {
            arrData = filterItems(keyword, arrData);
        }
        arrData.forEach(product => {
            html += displayProduct(product);
        });
    }
    QS('#best-smartphone-container').innerHTML = html
}

// HIỂN THỊ DANH SÁCH KHI TÌM TỪ KHOÁ
const search = (selectorBtn,selectorInput) => {
    QS(selectorBtn).onclick = (e) => {
       
            e.preventDefault();
        let keyword = QS(selectorInput).value;
        showProducts(products, keyword)
        
    }
}

// HÀM LỌC DANH SÁCH THEO KEYWWORD
const filterItems = (keyword, arrData) => {
    keyword = keyword.toLowerCase();
    return arrData.filter(product => {
        return product.tenSP.toLowerCase().indexOf(keyword) >= 0 ||
            String(product.giaBan).toLowerCase().indexOf(keyword) >= 0 ||
            product.thuongHieu.toLowerCase().indexOf(keyword) >= 0

    })
}

// HÀM SHOW PRODUCT HIỂN THỊ BAN ĐẦU 
const initProduct = () => {
    showProducts(products)
}

// CODE HIỂN THỊ CART SẢN PHẨM 
const displayProduct = (product) => {
    const giaBan = new Intl.NumberFormat().format(product.giaBan)
    return `
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-lg-3 p-2 mb-4">
            <div class="container"style="padding: 0px;">
                <div class="card  p-1 " style="box-shadow: 0px -1px 19px 1px #a3a7abcc;" >
                    <img class="card-img-top mt-2"  alt="Card image" style="width:  100%; height: 250px" src="${product.hinhAnh}" />
                    <div class="card-body " style="
                    padding: 14px">
                        <h4 class="card-title text-center">${product.tenSP}</h4>
                        <h6 class="card-text text-danger"> <i> GIẢM GIÁ : ${product.giamGia} % </i></h6>
                        <h6> Giá rẻ: ${giaBan} VND </h6>
                        <p "> <i>Thương hiệu : <span class="text-primary">${product.thuongHieu}</span></i> </p>
                        <div>
                        <i class="fa fa-star " style = "color: #FFE51E"></i>
                        <i class="fa fa-star " style = "color: #FFE51E"></i>
                        <i class="fa fa-star " style = "color: #FFE51E"></i>
                        <i class="fa fa-star " style = "color: #FFE51E"></i> 
                        <i class="fa fa-star " ></i>
                        </div>
                        <div>
                        <a href="#" class="btn btn-warning mt-2 btn-detail" data-product='${JSON.stringify(product)}' data-toggle="modal" data-product-id="${product.maSP}" style="
                        font-size: 15px" >Chi tiết</a>
                        <button href="#" class="btn btn-success mt-2 btn-buy" data-product='${JSON.stringify(product)}' style="
                        font-size: 15px">
                        <i class="fa fa-shopping-cart"></i>
                     
                        Thêm vào giỏ
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}



// HÀM HIỂN THỊ CHI TIẾT 
const detail = () => {
    $(document).on("click", ".btn-detail", function () {
        const productString = $(this).attr('data-product');
        const product = JSON.parse(productString);
        const html = detailProduct(product);
        $("#product-modal-detail").html(html);
        $('#exampleModal').modal('show');
    });
}


// -------- SHOW MODAL CART -------------


// TẠO LOCAL STORAGE
const creatLocalStorage = (key, data) => {
    let value = JSON.stringify(data)
    localStorage.setItem(key, value)
}

// LẤY LOCALSTORE VỀ 
const getLocalStorage = (key) => {
    let result = localStorage.getItem(key);
    result = JSON.parse(result);
    return result
}

// TẠO MẢNG ITEM CART BAN ĐẦU 
 let arrItemCart = []

 //HÀM ĐỂ HIỆN THỊ SẢN PHẨM TRONG CART
const showCart = (data) => {
    if(data.length<1){
        QS(".emptyCart").removeAttribute('hidden')
       QS(".tableCart").setAttribute('hidden','')
       QS(".modalCart-footer").setAttribute('hidden','')
       return
    }
    QS(".emptyCart").setAttribute('hidden','')
       QS(".tableCart").removeAttribute('hidden')
       QS(".modalCart-footer").removeAttribute('hidden')
    // QS(".modalCart-footer").style.display="block"
        let content = data.reduce((p, item) => p += cartItem(item), '');
        QS("#cartItem").innerHTML = content
        
}


// HÀM HIỂN THỊ LÊN DANH SÁCH ITEM CART BAN ĐẦU NẾU NHƯ CÓ TRONG LOCALSTORE
const initCart = () => {
    let initResult = getLocalStorage("gioHang")
    if (initResult) {
        arrItemCart = sortLodash(initResult, ['maSP']) 
    }
    showCart(arrItemCart)
   btnByNow(arrItemCart)
}


// THÊM SẢN PHẨM VÀO CART
const addToCart = () => {
    $(document).on("click", ".btn-buy", function () {
        const productString = $(this).attr('data-product');
        const product = JSON.parse(productString);
        let index = arrItemCart.findIndex(item => item.maSP == product.maSP);
        if (index == -1) {
            arrItemCart.push(product);
        }
        else {
            arrItemCart[index].soLuong++
        }
        arrItemCart = sortLodash(arrItemCart, ['maSP'])
        creatLocalStorage("gioHang", arrItemCart)
        showCart(arrItemCart);
        quantityCart();
        totalAmount()
        btnByNow(arrItemCart);
        toastr.success(`Bạn đã thêm sản phẩm ${product.tenSP} vào giỏ hàng`, 'Thêm sản phẩm thành công');
    })
}

// TÍNH TỔNG TIỀN 
const totalAmount = () => {
    let total =
        new Intl.NumberFormat().format(arrItemCart.reduce((tt, product) => {
            return tt += product.soLuong * product.giaBan
        }, 0))
    QS('.totalMoney').innerHTML = `${total} VND`

}


// XOÁ SẢN PHẨM 
const deleteProduct = () => {
    $(document).on("click", ".btn-delete", function () {
        const idProduct = $(this).attr('data-product-id');
        if (idProduct) {
            const product = arrItemCart.find(el => el.maSP = idProduct);
            arrItemCart = arrItemCart.filter(product => product.maSP != idProduct)
            arrItemCart = sortLodash(arrItemCart, ['maSP'])
            creatLocalStorage("gioHang", arrItemCart)
            showCart(arrItemCart)
            totalAmount()
            quantityCart()
            btnByNow(arrItemCart);
            toastr.error(`Bạn đã xoá sản phẩm ${product.tenSP} ra khỏi giỏ hàng`, 'Xoá sản phẩm thành công');
        }

    });

}


// TÍNH SỐ LƯỢNG SẢN PHẨM HIỂN THỊ TRÊN GIỎ
 const quantityCart= ()=>{
   let q= arrItemCart.reduce((q, product) => {
        return q += product.soLuong 
    }, 0)
    QS('#quantityCart').innerHTML=`(${q})`
    QS("#quantityCartModal").innerHTML=`(${q})`

}

// THAY ĐỔI SỐ LƯỢNG TRONG GIỎ HÀNG
const changeQuantity = (selector, sl) => {
    $(document).on("click", selector, function () {
        const idProduct = $(this).attr('data-product-id');
        if (idProduct) {
            let index = arrItemCart.findIndex(item => item.maSP == idProduct);
            if (index != -1) {
                arrItemCart[index].soLuong += sl
                if (arrItemCart[index].soLuong < 1) {
                    Swal.fire({
                        icon: 'error',
                        text: 'Số lượng sản phẩm không hợp lệ !',
                        footer: 'Vui lòng chọn số lượng sản phẩm lớn hơn 0'
                      })
                    return;
                }
            }

            arrItemCart = sortLodash(arrItemCart, ['maSP'])
            creatLocalStorage("gioHang", arrItemCart)
            showCart(arrItemCart)
            totalAmount()
            quantityCart()
        }

    });
}

const btnByNow = (arrCart)=>{
    if(arrCart.length<1){
        QS(".byNow").disabled=true
    } else{ QS(".byNow").disabled=false}
   
}

// TẤT CẢ CÁC HÀM CHẠY KHI GIAO DIỆN BẮT ĐẦU 
document.addEventListener("DOMContentLoaded", function (event) {
    initProduct();
    search("#btnSearch","#textSearch");
    search(".btnSearch",".textSearch")
    detail();
    initCart();
    addToCart();
    totalAmount()
    deleteProduct()
    changeQuantity(".btn-plus", 1)
    changeQuantity(".btn-sub", -1)
    quantityCart();
    toastr.options = {"timeOut": "800"}
});
