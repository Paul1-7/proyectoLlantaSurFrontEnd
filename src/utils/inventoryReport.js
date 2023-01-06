import JSPDF from 'jspdf';
import 'jspdf-autotable';

// define a generatePDF function that accepts a tickets argument
const generatePDF = (props) => {
  const dateNow = new Date().toLocaleDateString();
  const param = {
    columns: props.columns,
    data: props.data,
    logo: {
      src: props.logo?.src || '',
      type: props.logo?.type || '',
      width: props.logo?.width || '',
      height: props.logo?.height || '',
      margin: {
        top: props.logo?.margin?.top || 0,
        left: props.logo?.margin?.left || 0
      }
    },
    stamp: {
      inAllPages: props.stamp?.inAllPages || false,
      src: props.stamp?.src || '',
      width: props.stamp?.width || '',
      height: props.stamp?.height || '',
      margin: {
        top: props.stamp?.margin?.top || 0,
        left: props.stamp?.margin?.left || 0
      }
    },
    business: {
      name: props.business?.name || '',
      subsidiary: props.business?.subsidiary || '',
      reportDate: `fecha de reporte: ${dateNow}`
    }
  };
  // initialize jsPDF

  const doc = new JSPDF({
    orientation: 'l',

    unit: 'mm',
    format: 'letter'
  });
  const config = {
    docWidth: doc.internal.pageSize.width,
    docHeight: doc.internal.pageSize.height,
    colorBlack: '#000000',
    colorGray: '#4d4e53',
    currentHeight: 15,
    headerTextSize: 20,
    labelTextSize: 12,
    fieldTextSize: 10,
    lineHeight: 6,
    subLineHeight: 4
  };

  doc.setFontSize(config.headerTextSize);
  doc.setTextColor(config.colorBlack);
  doc.text(config.docWidth - 60, config.currentHeight, param.business.name, 'left');
  doc.setFontSize(config.fieldTextSize);

  if (param.logo.src) {
    let imageHeader = '';
    if (typeof window === 'undefined') {
      imageHeader = param.logo.src;
    } else {
      imageHeader = new Image();
      imageHeader.src = param.logo.src;
    }
    if (param.logo.type)
      doc.addImage(
        imageHeader,
        param.logo.type,
        10 + param.logo.margin.left,
        config.currentHeight - 5 + param.logo.margin.top,
        param.logo.width,
        param.logo.height
      );
    else
      doc.addImage(
        imageHeader,
        10 + param.logo.margin.left,
        config.currentHeight - 5 + param.logo.margin.top,
        param.logo.width,
        param.logo.height
      );
  }

  doc.setTextColor(config.colorGray);

  // bussines
  config.currentHeight += config.subLineHeight;
  config.currentHeight += config.subLineHeight;
  doc.text(config.docWidth - 60, config.currentHeight, param.business.subsidiary, 'left');

  config.currentHeight += config.subLineHeight;
  doc.text(config.docWidth - 60, config.currentHeight, param.business.reportDate, 'left');

  // title
  doc.setFontSize(config.headerTextSize);
  config.currentHeight += 10;
  doc.setTextColor(config.colorBlack);
  doc.text('Reporte de productos', 108, config.currentHeight, {
    align: 'center'
  });

  // line breaker after logo & business info
  config.currentHeight += config.subLineHeight;
  doc.line(14, config.currentHeight, config.docWidth - 14, config.currentHeight);

  // table to report
  config.currentHeight += config.subLineHeight;
  doc.autoTable(param.columns, param.data, {
    startY: config.currentHeight,
    theme: 'grid',
    styles: {
      lineColor: [50, 50, 50],
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [50, 50, 50],
      fontSize: 12
    }
  });

  doc.save(`report_.pdf`);
};

export default generatePDF;
