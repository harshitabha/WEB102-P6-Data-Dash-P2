import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVisualization = ({data}) => {
  console.log(data);
    return (
      <>
        <h1>hi</h1>
        <ResponsiveContainer width="10vw" height="100vh">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="val" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="power" fill="#8884d8" />
            <Bar dataKey="tough" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <h1>hi</h1>
      </>
    );
}

export default DataVisualization;