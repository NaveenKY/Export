/*=====================================================
 *
 *	Export : A Really Small JavaScript Library
 *	(c) Naveen Kumar 2015
 *
 ======================================================*/

/*	Export Object Constructor
 =============================*/
var _instance;
var Export = function Export() {
    if (!_instance) {
        _instance = this;
    }
    return _instance;
};

/*	_ Prototype Functions
 ============================*/
Export.prototype = {
    exportJSONtoCSV: function (jsonData, fileName) {
		if(jsonData){
			if(jsonData instanceof Object){
				if(!Array.isArray(jsonData)){
					jsonData = Array(jsonData);
				}
			} else {
				try {
					jsonData = JSON.parse(jsonData);
				} catch(err){
					throw 'Invalid JSON string passed :: ' +err.message;
				}
			}
			if(jsonData.length > 0){
				var keys = Object.keys(jsonData[0]);
				var csvData = '';
				jsonData.forEach(function(model){
					var rowData = '';
					keys.forEach(function(key, index){
						rowData+=model[key];
						if(index !== (keys.length-1)){
							rowData+=',';
						}
					});
					rowData+='\n';
					csvData+=rowData;
				});
				csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvData);
				var downloadLink = document.createElement('a');
				downloadLink.download= fileName?fileName:'Export' + '.csv';
				downloadLink.href=csvData;
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
		}
    },
	exportJSONtoXLS: function(jsonData, headers, fileName) {
		if(jsonData){
			if(jsonData instanceof Object){
				if(!Array.isArray(jsonData)){
					jsonData = Array(jsonData);
				}
			} else {
				try {
					jsonData = JSON.parse(jsonData);
				} catch(err){
					throw 'Invalid JSON string passed :: ' +err.message;
				}
			}
			if(jsonData.length > 0){
				var xlsData = '';
				var headerRow =  '';
				if(headers){
					headerRow =  '<ss:Row>\n';
					headers.forEach(function(header){
						headerRow += '  <ss:Cell>\n<ss:Data ss:Type="String">' + header + '</ss:Data>\n</ss:Cell>\n';
					});
					headerRow += '</ss:Row>\n';
				}
				xlsData =  '<?xml version="1.0"?>\n<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n<ss:Worksheet ss:Name="Sheet1">\n<ss:Table>\n\n' + headerRow;

				var keys = Object.keys(jsonData[0]);
				jsonData.forEach(function(model){
					xlsData += '<ss:Row>\n';
					keys.forEach(function(key, index){
						xlsData += '  <ss:Cell>\n<ss:Data ss:Type="String">' + model[key] + '</ss:Data>\n</ss:Cell>\n';
					});
					xlsData += '</ss:Row>\n';
				});
				xlsData+='\n</ss:Table>\n</ss:Worksheet>\n</ss:Workbook>\n';
				console.log(xlsData);
				var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
				var blob = new Blob([xlsData], {
					'type': contentType
				});
				var downloadLink = document.createElement('a');
				downloadLink.href=window.URL.createObjectURL(blob);
				downloadLink.download= fileName?fileName:'Export' + '.xls';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
		}
	}
};