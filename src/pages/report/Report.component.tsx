import React, {useEffect, useState} from 'react';
import AreaChartComponent from "../../components/chart/area-chart/area-chart.component";
import './Report.component.styles.scss';
import {Button, message, Select} from 'antd';
import {connect} from "react-redux";
import {fetchSaleReportStart} from "../../redux/sale/sale.actions";
import {createStructuredSelector} from "reselect";
import {selectAnnualSaleReport} from "../../redux/sale/sale.selector";
import {ReportSale} from "../../domain/interfaces/ReportSale";
import {generatePDFSale, saleReportAnnual} from '../../data/rest/sale.service';

interface Props {
  fetchSaleReport: () => void;
}

const ReportPage = ({fetchSaleReport}: Props) => {

  const [report, setReport] = useState<Array<ReportSale>>([]);
  const [year, setYear] = useState<string>('');
  const [years, setYears] = useState<Array<string>>([]);

  const getReport = async () => {
    const annualSaleReport = await saleReportAnnual() as Array<ReportSale>;
    setReport(annualSaleReport);
    const years = annualSaleReport.map(x => x.year);
    setYears(years);
    setYear(years[0]);
  }

  useEffect(() => {
    getReport();
  }, []);

  const handleChange = (year: string) => {
    setYear(year);
  }

  const generatePDF = async () => {
    try {
      const reportSale = report.find(x => x.year === year);
      if (!reportSale) return;
      const file: any = await generatePDFSale(reportSale);

      const fileName = `Reporte de ventas ${year}.pdf`;
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      message.error('No se pudo generar el reporte');
    }
  }

  return (
    <div className="report">
      <h1 className="report__title">Reporte de Ventas</h1>

      <div className="report__year flex-nowrap justify-content-between">
        <div></div>
        <Select value={year} style={{ width: 120 }} onChange={handleChange}>
          {
            years.map(x => (
                <Select.Option value={x} >{x}</Select.Option>
            ))
          }
        </Select>
        <Button onClick={generatePDF}>Generar PDF</Button>
      </div>

      <div className="report__chart flex-nowrap justify-content-center">
        {
          report && <AreaChartComponent report={report} year={year} />
        }
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  annualSaleReport: selectAnnualSaleReport
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchSaleReport: () => dispatch(fetchSaleReportStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
