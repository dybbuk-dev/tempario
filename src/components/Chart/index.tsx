import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Select } from "@chakra-ui/react";

import { ChartData } from "./types";

export interface ChartProps {
    chartData: ChartData;
    interval: {
        start: Date;
        end: Date;
    };
}

const ApexChart: React.FC<ChartProps> = ({
    chartData,
    interval,
    ...props
}) => {
    const labels = chartData.labels.map((date) => date.getTime());
    const datasets = chartData.series.map(({ color, label, values }, index) => ({
        name: label,
        data: values
    }));
    const colors = chartData.series.map(({ color }) => color);
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
        },
        colors,
        grid: {
            borderColor: "#D5D5D5",
            padding: {
                right: 30
            }
        },
        labels,
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
            fontWeight: 400,
            fontSize: "14px",
            fontFamily: "Lato",
            itemMargin: {
                horizontal: 14
            },
            markers: {
                width: 10,
                height: 10,
                offsetY: 1,
                offsetX: -3
            }
        },
        markers: {
            size: 4,
            strokeWidth: 0
        },
        stroke: {
            curve: "smooth",
            lineCap: "round",
            width: 2
        },
        tooltip: {
            style: {
                fontFamily: "Lato",
                fontSize: "12px"
            },
            x: {
                format: "yyyy.MM.dd"
            },
            y: {
                formatter: (value: number) => value?.toFixed(1),
                title: {
                    formatter: () => ""
                }
            },
            marker: {
                show: true
            },
            theme: "light"
        },
        xaxis: {
            type: "datetime",
            min: interval.start.getTime(),
            max: interval.end.getTime(),
            labels: {
                show: true,
                style: {
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Roboto"
                },
                datetimeFormatter: {
                    month: "MMM"
                }
            },
            tooltip: {
                enabled: false
            },
        },
        yaxis: {
            min: 0,
            max: 40,
            tickAmount: 4,
            decimalsInFloat: 0,
            labels: {
                align: "left",
                style: {
                    fontSize: "12px",
                    fontWeight: 400,
                    fontFamily: "Roboto"
                },
            }
        }
    }

    return (
        <Box position="relative" backgroundColor="#FAFAFA" paddingTop={4} boxShadow="0px 7px 38px rgba(0, 0, 0, 0.15)">
            <Select
                position="absolute"
                top="16px"
                left="6px"
                width="100px"
                height="30px"
                fontSize="14px"
                fontFamily="Roboto"
                fontWeight="400"
                border="none"
                _focus={{
                    border: "none"
                }}
                zIndex={1}
            >
                <option value="month">Mês</option>
                <option value="year">Ano</option>
            </Select>
            <ReactApexChart
                type="line"
                series={datasets}
                options={options}
                height="300"
            />
        </Box>
    );
};

export default ApexChart;
