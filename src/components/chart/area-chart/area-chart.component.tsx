import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Label} from 'recharts';
import {ReportSale} from "../../../domain/interfaces/ReportSale";

interface Props {
  report: Array<ReportSale>;
  year: string;
}

const AreaChartComponent = ({report, year}: Props) => {
  const annualReport = report.find(x => x.year === year)?.months || [];
  return (
      <>
        <AreaChart width={730} height={350} data={annualReport}
                            margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="month" >
            <Label value="Meses del año" offset={0} position="insideBottom"/>
          </XAxis>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="venta" stroke="#000" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </>
  );
};

export default AreaChartComponent;
