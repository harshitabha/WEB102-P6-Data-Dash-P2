import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
} from "recharts";
import Header from "../components/Header";
import "./DataViz.css";

const DataViz = ({chartData}) => {
	const barColors = ["#457d55", "#FFCAB1", "#925E78", "#6699CC"];
	return (
		<>
			<Header />
			<div className="data-elem">
				{console.log(chartData.barData)}
				<BarChart width={600} height={600} data={chartData.barData}>
					<Bar dataKey="students" fill="green" />
					<CartesianGrid stroke="#ccc" />
					<XAxis dataKey="name" />
					<YAxis />
				</BarChart>
				
			</div>
		</>
	);
};

export default DataViz;
