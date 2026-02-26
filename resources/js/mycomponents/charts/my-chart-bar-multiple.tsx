import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { useMemo, useState } from 'react';

interface MyChartBarMultiplePropsType {
    chartData: { [key: string]: number | string }[];
    chartConfig: ChartConfig;
    defaultActiveChart: string;
    attributesForTotal: string[];
    xAxisDataKey: string;
    titleDescription: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
}

function MyChartBarMultiple({
    chartData,
    chartConfig,
    defaultActiveChart,
    attributesForTotal,
    xAxisDataKey,
    titleDescription,
}: MyChartBarMultiplePropsType) {
    const [activeChart, setActiveChart] =
        useState<keyof typeof chartConfig>(defaultActiveChart);

    const total = useMemo(() => {
        const totalObject: { [key: string]: number } = {};
        attributesForTotal.forEach((attributeForTotal) => {
            totalObject[attributeForTotal] = chartData.reduce(
                (acc, currentObject) => {
                    return acc + Number(currentObject[attributeForTotal]);
                },
                0,
            );
        });
        return totalObject;
    }, [chartData, attributesForTotal]);

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-4">
                    <CardTitle>{titleDescription[activeChart].title}</CardTitle>
                    <CardDescription>
                        {titleDescription[activeChart].description}
                    </CardDescription>
                </div>
                <div className="flex">
                    {attributesForTotal.map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-nowrap text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-center text-lg leading-none font-bold sm:text-3xl">
                                    {total[
                                        key as keyof typeof total
                                    ].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[350px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            bottom: 50,
                            top: 30,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey={xAxisDataKey}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            angle={90}
                            textAnchor="start"
                            tickFormatter={(value) => {
                                return value;
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    // nameKey="count"
                                    labelFormatter={(value) => {
                                        return value;
                                    }}
                                    active={false}
                                    payload={[]}
                                    coordinate={undefined}
                                    accessibilityLayer={false}
                                    activeIndex={undefined}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={`var(--color-${activeChart})`}
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default MyChartBarMultiple;
