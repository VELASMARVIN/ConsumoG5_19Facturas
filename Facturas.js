var UrlGetFacturas = 'http://localhost:90/G5_19/controller/facturas.php?op=GetFacturas';
var UrlPostFacturas = 'http://localhost:90/G5_19/controller/facturas.php?op=InsertFacturas';
var UrlGetUno = 'http://localhost:90/G5_19/controller/facturas.php?op=GetUno';
var UrlPutFacturas = 'http://localhost:90/G5_19/controller/facturas.php?op=UpdateFactura';
var UrlDeleteFacturas = 'http://localhost:90/G5_19/controller/facturas.php?op=DeleteFacturas';

$(document).ready(function () {
    cargarFacturas();
});

function cargarFacturas() {
    $.ajax({
        url: UrlGetFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
             var valores = '';

               for (i = 0; i < MiItems.length; i++) {
                     valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].NUMERO_FACTURA + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' + MiItems[i].FECHA_FACTURA + '</td>' +
                    '<td>' + MiItems[i].DETALLE + '</td>' +
                    '<td>' + MiItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + MiItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + MiItems[i].TOTAL + '</td>' +
                    '<td>' + MiItems[i].FECHA_VENCIMIENTO + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' +
                    '<button class ="btn btn-info" onclick="CargarFactura(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class ="btn btn-danger" onclick="EliminarFacturas(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                   $('.Facturas').html(valores);
               }

        } 
    });
}
function AgregarFactura() {
    var datosfactura = {
        ID: $('#ID').val(),
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPostFacturas,
        type: 'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Factura Agregada");
}
function CargarFactura(ID) {
    var datosfactura = {
        ID: ID
    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btn_Actualizar = '<input type="submit" id="btn_Actualizar" onclick="ActualizarFacturas(' + MiItems[0].ID + ')"' +
                'value="Actualizar Factura" class="btn btn-primary"></input>';
            $('.button').html(btn_Actualizar);
        }
    });

}

function ActualizarFacturas(ID) {
    var datosfactura = {
        ID: ID,
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val(),
        ESTADO: $('#ESTADO').val(),

    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlPutFacturas,
        type: 'PuT',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Factura Actualizada");
}
function EliminarFacturas(ID) {
    var datosfactura = {
        ID: ID
    };
    var datosfacturajson = JSON.stringify(datosfactura);

    $.ajax({
        url: UrlDeleteFacturas,
        type: 'DELETE',
        data: datosfacturajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Factura Borrada");
}
