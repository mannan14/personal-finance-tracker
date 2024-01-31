import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DashboardLayout from '@/layout/dashboardLayout';
import axios from 'axios';
import chartsConfig from "@/config/charts-config";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

const Home = () => {

  const [chartData, setChartData] = useState<Record<any,any>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/overview');
        const { totalAmountByMonth, expenseDistribution, monthlyTypeSpending } = res.data;
        // monthlyTypeSpending
        console.log(res.data)

        // Prepare data for charts
        const totalAmountData = {
          options: {
            ...chartsConfig,
            chart: {
              id: 'total-amount-chart',
            },
            xaxis: {
              categories: Object.keys(totalAmountByMonth),
            },
          },
          series: [
            {
              name: 'Total Amount',
              data: Object.values(totalAmountByMonth),
            },
          ],
        };

        const expenseDistributionData = {
          options: {
            ...chartsConfig,
            chart: {
              id: 'expense-distribution-chart',
            },
            labels: Object.keys(expenseDistribution),
          },
          series: Object.values(expenseDistribution),
        };

        const monthlyTypeSpendingData = {
          options: {
            ...chartsConfig,
            chart: {
              id: 'monthly-type-spending-chart',
              stacked: true,
            },
            xaxis: {
              categories: Object.keys(monthlyTypeSpending || {}),
            },
          },
          series: Object.entries(monthlyTypeSpending || {}).map(([type, data]) => ({
            name: type,
            data: Object.values(data as { [key: string]: number }) || [],
          })),
        };

        setChartData({
          totalAmountData,
          expenseDistributionData,
          monthlyTypeSpendingData,
        });
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout page="">
      <div className="max-h-full pb-16 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300"> 
        <div className="p-2 dark:border-gray-700 space-y-4">
          <section className="flex-row space-y-4 lg:flex md:flex-row lg:space-y-0 gap-4">
            <div className=" p-4 rounded-2xl w-full h-2/3 border text-black border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
              {chartData.totalAmountData && (
                <>
                  <h2 className="dark:text-white-100 text-black">Total Amount by Month</h2>
                  <Chart
                    options={chartData.totalAmountData.options}
                    series={chartData.totalAmountData.series}
                    type="line"
                    height={350}
                  />
                </>
              )}
            </div>
            <div className=" p-4 rounded-2xl w-full h-2/3 border text-black border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
              {chartData.expenseDistributionData && (
                <>
                  <h2 className="dark:text-white-100 text-black">Expense Distribution</h2>
                  <Chart
                    options={chartData.expenseDistributionData.options}
                    series={chartData.expenseDistributionData.series}
                    type="donut"
                    height={350}
                  />
                </>
              )}
            </div>
          </section>
          <section>
            <div className=" p-4 rounded-2xl w-full h-2/3 border text-black border-me-green-100 bg-[#F6F6F6] dark:bg-me-green-300">
              <h2 className="dark:text-white-100 text-black">Monthly Type Spending</h2>
              {chartData.monthlyTypeSpendingData ? (
                <Chart
                options={{
                  chart: {
                    id: 'monthly-type-spending-chart',
                    type: 'bar',
                    stacked: true,
                  },
                  xaxis: {
                    categories: Object.keys(chartData.monthlyTypeSpendingData),
                  },
                  yaxis: {
                    title: {
                      text: 'Amount',
                    },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                    },
                  },
                  legend: {
                    position: 'top',
                  },
                }}
                series={[
                  { name: 'Need', data: chartData.monthlyTypeSpendingData.need || [] },
                  { name: 'Wants', data: chartData.monthlyTypeSpendingData.want || [] },
                  { name: 'Saving', data: chartData.monthlyTypeSpendingData.saving || [] },
                ]}
                type="bar"
                height={350}
                />
              ) : (
                <p>Loading or no data available</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;