import * as React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { useTranslate } from 'react-admin';
import { format, subDays, addDays } from 'date-fns';

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date) =>
    new Date(date).toLocaleDateString();

const aggregateViewsByDay = (posts) =>
    posts
        .filter((post) => post.status !== 'rejected')
        .reduce((acc, curr) => {
            const day = format(curr.published_at, 'YYYY-MM-DD');
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += curr.views;
            return acc;
        }, {});

const getViewPerDay = (views)=> {
    const daysWithRevenue = aggregateViewsByDay(views);
    return lastMonthDays.map(date => ({
        published_at: date.getTime(),
        views: daysWithRevenue[format(date, 'YYYY-MM-DD')] || 0,
    }));
};

const ViewChart = ({ views }) => {
    const translate = useTranslate();
    if (!views) return null;

    return (
        <Card>
            <CardHeader title={translate('Month History')} />
            <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getViewPerDay(views)}>
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="published_at"
                                name="Date"
                                type="number"
                                scale="time"
                                domain={[
                                    addDays(aMonthAgo, 1).getTime(),
                                    new Date().getTime(),
                                ]}
                                tickFormatter={dateFormatter}
                            />
                            <YAxis dataKey="views" name="Visitor" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                formatter={value =>
                                    new Intl.NumberFormat(undefined, {}).format(value)
                                }
                                labelFormatter={(label) =>
                                    dateFormatter(label)
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default ViewChart;
