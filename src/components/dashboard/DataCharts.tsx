'use client';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { studiesByYearData, organismTypeData } from '@/lib/dashboard-data';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';

const chartConfig: ChartConfig = {
    studies: {
      label: "Studies",
      color: "hsl(var(--primary))",
    },
    human: { label: 'Human', color: 'hsl(var(--chart-1))' },
    plant: { label: 'Plant', color: 'hsl(var(--chart-2))' },
    microorganism: { label: 'Microorganism', color: 'hsl(var(--chart-3))' },
    animal: { label: 'Animal', color: 'hsl(var(--chart-4))' },
};

export default function DataCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-card/60 backdrop-blur-lg border-primary/20">
        <CardHeader>
          <CardTitle>Studies Per Year</CardTitle>
          <CardDescription>Number of NASA biosciences publications released annually.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={studiesByYearData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="studies" fill="var(--color-studies)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-card/60 backdrop-blur-lg border-primary/20">
        <CardHeader>
          <CardTitle>Organism Types Studied</CardTitle>
          <CardDescription>Distribution of research across different life forms.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <PieChart>
                    <Tooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={organismTypeData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    />
                    <Legend/>
                </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
