var cart = [];
$(() => {
  var cartdata = localStorage.getItem("cart-data");
  if (cartdata) {
    cart = JSON.parse(cartdata);
  }
  viewCart();

  $(document).on('change', '.qty', function () {
    let q = $(this).val();
    let p = $(this).parent().prev().text();
    $(this).parent().next().text(Number(q) * Number(p));
    console.log($('.amount'));
    let amt = 0;
    $('.amount').each((i, el) => {
      amt += Number($(el).text());
    });
    $('#sum').text('Total: ' + amt)
  });

  $(document).on('click', '.save', function () {
    let id = $(this).data('pk');
    let q = $(this).parent().prev().prev().find('input').val();
    console.log(id);
    let item = cart.find(x => x.id == id);
    item.qty = q;
    localStorage.setItem("cart-data", JSON.stringify(cart));
  });

  $(document).on('click', '.btn-del', function () {
    let id = $(this).data('pk');
    let i = cart.findIndex(c=> c.id == id);
    cart.splice(i, 1);
    localStorage.setItem("cart-data", JSON.stringify(cart));
    viewCart();
  });
  $(document).on('click', '#checkout', function () {
    cart = [];
    localStorage.setItem("cart-data", JSON.stringify(cart));
    window.location.href = 'index.html';
  });
});


function viewCart() {
  let total = 0;
  $('#cartbody').empty();
  cart.forEach(c => {
    total += Number(c.price) * Number(c.qty);
    $('#cartbody').append(`<tr>
                <td>${c.name}</td>
                <td>${c.price}</td>
                <td><input min="1" type="number" value="${c.qty}" style="width:50px" class="qty" /></td>
                <td class='amount'>${Number(c.price) * Number(c.qty)}</td>
                <td>
                        <button type="button" class="btn-del" data-pk="${c.id}">Delete</button>
                        <button type="button" class="btn save" data-pk="${c.id}">Save</button>
                </td>
            </tr>`);
  });
  $('#cartbody').append(`<tr>
            <td colspan="4" style="text-align:right;" id="sum">Total: ${total}</td>
            <td>
                <button type="button" class="btn-del" id="checkout">Checkout</button>
            </td>
        </tr>`)
}