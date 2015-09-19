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
				downloadLink.download= fileName?fileName:'Excel' + '.csv';
				downloadLink.href=csvData;
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
		}
    }
};