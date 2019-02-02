let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    for (let page of pdfData.formImage.Pages) {

        for (let text of page.Texts) {
        	let collision = false;
        	// console.log(page.Fills)
            for (let fill of page.Fills) {
            	if(!collision){
	            	if(
	            		((text.x >= fill.x && text.x <= (fill.x + fill.w))  
	            		||(fill.x >= text.x && fill.x <= (text.x + text.w))) 
	            		&&
	            		((text.y >= fill.y && text.y <= (fill.y + fill.h))
	            		|| (fill.y >= text.y && fill.y <= (text.y + 0.863)))){

	            		collision = true;
	            		var textRun = decodeURIComponent(text.R.map(run => { return run.T}));
	            		// console.log(`Collision @ ${text.x} ${text.y} ${text.w} - ${textRun}`);
	                	console.log(`Collision`);
	                	// console.log(text);
	                	// console.log(fill);
	                	console.log(`  ${textRun}`);
	                	console.log(`  Text X: ${text.x} - ${fill.x} ${fill.x + fill.w}`);
	                	console.log(`  Text Y: ${text.y} - ${fill.y} ${fill.y + fill.h} ${fill.h}`);
	                	console.log(`  Fill X: ${fill.x} - ${text.x} ${text.x + text.w}`);
	                	console.log(`  Fill X: ${fill.y} - ${text.y} ${text.y + 0.863}`);	                	
	            	}
            	}
            }
            if(!collision){
            	// console.log('No Collision');
            }
            // console.log(`@ ${text.x} ${text.y} ${text.w} - ${textRun}`);
        }
    }
});

pdfParser.loadPDF("sample.pdf");