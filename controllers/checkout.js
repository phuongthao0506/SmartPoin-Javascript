import { checkEmpty, checkText, checkNumber, checkEmail, capitalize } from "../models/validation.js"

// HÀM LẤY SELECTOR
function QS(ele) {
    return document.querySelector(ele)
}


// HÀM FORRMAT NUMBER
const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number)
}

// HÀM HIỂN THỊ DANH SÁCH ITEMCART 
const showYourCard = () => {
    let products = localStorage.getItem("gioHang");
    products = products ? JSON.parse(products) : [];
    if (products.length > 0) {
        renderYourCard(products);
        QS(".not-empty-card").removeAttribute('hidden')
        QS(".emptyCart").setAttribute('hidden', '')
    } else {
        QS(".emptyCart").removeAttribute('hidden')
        QS(".not-empty-card").setAttribute('hidden', '')
    }
}



// HÀM RENDER RA SẢN PHẨM 
const renderYourCard = (products) => {
    const totalAmount = products.reduce((a, b) => a += b.giaBan * b.soLuong, 0);
    const html = products.reduce((a, b) => a += htmlProduct(b), '');
    QS('.ul-your-card').innerHTML = html
    QS('.totalMoney').innerHTML = `${formatNumber(totalAmount)} VND`

}


// GIAO DIỆN ITEM CART
const htmlProduct = (product) => {
    return `
    <li class="list-group-item d-flex justify-content-between lh-condensed ">
              <div  >
              <img  src= "${product.hinhAnh}" alt="" style= "max-width: 100%; height: 75px"  />
                <h6 class="my-0 mt-2">${product.tenSP}</h6>
                <small class="text-muted">Số Lượng: ${product.soLuong}</small>
              </div>
              <span class="text-muted">${formatNumber(product.giaBan * product.soLuong)} VND</span>
            </li>
    `
}
QS('#name').onchange = () => {
    let value = document.querySelector('#name').value
    document.querySelector('#name').value = capitalize(value)
}



// CHECK VALIDATE
const checkForm = () => {
    let isValue = true
    isValue &= checkEmpty('#address', '.emptyAddress', 'Địa chỉ giao hàng') &
        checkEmpty('#name', '.emptyName', 'Họ và Tên') &
        checkEmpty('#phone', '.emptyPhone', 'Số điện thoại') &
        checkEmpty('#email', '.emptyEmail', 'Email') &
        checkEmpty('#city', '.emptyCity', 'Tỉnh/Thành phố') &
        checkEmpty('#town', '.emptyTown', 'Quận/Huyện')
    if (isValue) {
        isValue &= checkText('#name', '.emptyName', 'Họ và Tên') &
            checkNumber('#phone', '.errPhone', 'Số điện thoại') &
            checkEmail('#email', '.errEmail') &
            checkText('#city', '.errCity', 'Tỉnh/Thành phố') &
            checkText('#town', '.errTown', 'Quận/Huyện')
    }
    return isValue
}



// SEND MAIL 
const sendEmail = (email, name) => {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "phamthao05061997@gmail.com",
        Password: "T123456789@",
        To: `${email}`,
        From: "phamthao05061997@gmail.com",
        Subject: "SMART POINT - Đơn hàng của bạn ",
        Body: `<div style="background-color:#E9E9E9;padding: 0px;width:600px;margin:0 auto;border:1px solid #d6d6d6;padding:20px;border-radius:12px;color:black">
      <img src="https://res.cloudinary.com/wordpressphuongthao/image/upload/v1626107640/logo-shop-dien-thoai-7_tqocmm.jpg" style = "width: 50%">
    <div style="font-size:16px;line-height:1.7">
<h2 style="font-weight:bold;font-size:26px;color:#333;margin:0 0 15px;line-height:1.4">Đơn hàng của bạn !</h2>
<p style="margin:0">Thư này được gửi từ <a href= "http://127.0.0.1:5500/">Smart Point</a></p>
<div style="max-width:700px;margin:15px auto">
<div style="display:flex">
  </div>
</div>
<div style="padding:5px 20px;background-color:#eee;margin-top:20px;border-radius:4px;line-height:1.6;font-weight:300;font-size:16px;color:#333">
<p> Thân gửi ${name}</p><p></p><p> Chúc bạn mỗi ngày tốt lành và bình an trong mùa dịch !.</p><p>Gửi quý khách chi tiết biên nhận đơn hàng: </p>
${contentEmail()}
<p><em>Cảm ơn quý khách đã mua hàng tại Smart Point!

</em></p>
<p>Trân trọng, !</p>
<p>
<a href= "http://127.0.0.1:5500/">Smart Point</a>
</p>
</div>
</div>
<div style="border-top:1px solid #eee"></div>
    <p style="color:#969696;font-size:11px">Đây là Email tự động, vui lòng không trả lời lại. Nếu bạn đang tìm kiếm sự trợ giúp, hãy truy cập Smart Point, mục Hỗ trợ.</p>
    </div>`,
    })
}



// NỌI DUNG EMAIL 
const contentEmail = () => {
    let products = localStorage.getItem("gioHang");
    products = JSON.parse(products)
    const totalAmount = products.reduce((a, b) => a += b.giaBan * b.soLuong, 0);
    let item = products.reduce((d, product) => {
        return d += `
        <tr>
        <td> <strong>- ${product.tenSP}</strong></td>
        <td>
              Số lượng :  ${product.soLuong}
        </td>
        <td>${new Intl.NumberFormat().format(product.soLuong * product.giaBan)} VND </td>
        </tr>
    `
    }, '')
    let html = `
    <div>
     <table class="table" style = "width:100%">
    
    <tbody class="text-center">
  ${item}
    </tbody style = "border-top:1px solid gray">
    <tfoot class="tableHead">
    <tr>
        <td></td>
        <td><strong>Tổng Tiền <strong>: </td>
        <td style ="color:red ; text-decoration-line: overline">${new Intl.NumberFormat().format(totalAmount)} VND </td>
    </tr>
</tfoot>
</table> </div>
`
    return html
}

// THÔNG TIN KHÁCH HÀNG 
const infoCustomer = () => {
    QS('#btnSubmit').onclick = () => {
        const isValue = checkForm()
        if (!isValue) {
            toastr.error('Bạn vui lòng kiểm tra lại thông tin ', 'THÔNG TIN GIAO HÀNG KHÔNG HỢP LỆ !')
            return;
        }
        const name = QS('#name').value
        const phone = QS('#phone').value
        const email = QS('#email').value
        const city = QS('#city').value
        const town = QS('#town').value
        const address = QS('#address').value
        const customer = {
            name: name,
            phone: phone,
            email: email,
            city: city,
            town: town,
            address: address
        }
        let infoCustomer = JSON.stringify(customer)
        localStorage.setItem('customer', infoCustomer)
        checkoutSuccess()
        sendEmail(email, name)
        localStorage.removeItem("gioHang")
        showYourCard()
    }
}


// CHECK THÀNH CÔNG 
const checkoutSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: "Đặt Hàng Thành Công",
        html: showInfoSuccess(),
        confirmButtonColor: 'rgb(94 204 102)',
        confirmButtonText:
            ' <a href="/" class="btn ">Xem thêm sản phẩm !</a>',
        footer: `
        <p> Cảm ơn quý khách đã mua hàng tại Smart Point!!  </p>`
    })
}


// HIỂN THỊ THÔNG TIN KHÁCH HÀNG TRONG SUCCESS 
const showInfoSuccess = () => {
    let html = "";
    let customer = localStorage.getItem("customer");
    if (customer) {
        customer = JSON.parse(customer);
        html += `<div class="text-left">
        <table class="table " style="font-size: 12px">
            <tr>
                <th>Tên: </th>
                <td>${customer.name} </td>
            </tr>
            <tr>
                <th>Số điện thoại: </th>
                <td>${customer.phone} </td>
            </tr>
            <tr>
                <th>Email: </th>
                <td>${customer.email} </td>
            </tr>
            <tr>
                <th>Địa chỉ: </th>
                <td>${customer.address + ' - ' + customer.town + ' - ' + customer.city}</td>
            </tr>
        </table>
        <p class="text-danger text-center" style="font-size:15px"> Hoá đơn mua hàng đã gửi email cho quý khách !</p>
        </div>`
    }
    return html;
}


// HIỂN THỊ THÔNG TIN KHÁCH HÀNG BAN ĐẦU 
const initCustomer = () => {
    let customer1 = localStorage.getItem("customer");
    if (customer1) {
        customer1 = JSON.parse(customer1)
        for (const key in customer1) {
            QS(`#${key}`).value = customer1[key]
        }
    }
}


// HIỂN THỊ SỐ LƯỢNG SP TRONG ICON GIỎ HÀNG 
const quantityCart = () => {
    let products = localStorage.getItem("gioHang");
    products = products ? JSON.parse(products) : [];
    let q = products.reduce((q, product) => {
        return q += product.soLuong
    }, 0)
    QS('#quantityCart').innerHTML = `(${q})`
    
}



// CÁC HÀM ĐƯỢC CHẠY NGAY KHI LOAD TRANG 
document.addEventListener("DOMContentLoaded", function (event) {
    showYourCard();
    initCustomer()
    quantityCart();
    infoCustomer();
    toastr.options = { "timeOut": "2000" };
})
