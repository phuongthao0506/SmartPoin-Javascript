

export const cartItem = (product)=>{
    
   let cartItem= ` 
   
    <tr>
    <td>${product.maSP}</td>
    <td><img src= "${product.hinhAnh}" alt="" style= "max-width: 100%; height: 75px"  /></td>
    <td> <h6>${product.tenSP}</h6></td>
    <td>
        <div>
            <button type="button" class="btn btn-light btn-plus" data-product-id="${product.maSP}">+</button>
            ${product.soLuong}
            <button type="button" class="btn btn-light btn-sub" data-product-id="${product.maSP}">-</button>
        </div>

    </td>
    <td>${new Intl.NumberFormat().format(product.giaBan)} VND </td>
    <td>${new Intl.NumberFormat().format(product.soLuong * product.giaBan)} VND </td>
    <td> <button class="btn btn-danger btn-delete" data-product-id="${product.maSP}"> Xoá</button></td>
  </tr>
  `
 return cartItem
}
