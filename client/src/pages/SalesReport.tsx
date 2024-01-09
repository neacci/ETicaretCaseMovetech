import React, { useState, useEffect } from 'react';
import { networkRequest } from '../helpers/NetworkRequest';
import { startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from 'date-fns';

const SalesReportPage = () => {
    const [activeTab, setActiveTab] = useState('weekly');
    const [salesReport, setSalesReport] = useState([]);
    const [userPurchases, setUserPurchases] = useState([]);

    useEffect(() => {
        fetchUserPurchases();
        fetchSalesReport(activeTab);
    }, [activeTab]);

    const getDateRange = (tab: string) => {
        const now = new Date();
        switch (tab) {
            case 'weekly':
                return [startOfWeek(now), endOfWeek(now)];
            case 'monthly':
                return [startOfMonth(now), endOfMonth(now)];
            case 'yearly':
                return [startOfYear(now), endOfYear(now)];
            default:
                return [startOfWeek(now), endOfWeek(now)];
        }
    };

    const fetchSalesReport = async (tab: string) => {
        const [startDate, endDate] = getDateRange(tab);
        try {
            const response = await networkRequest({
                endpoint: `SalesReport/GetSalesReport?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
                method: 'GET'
            });
            setSalesReport(response.$values);
        } catch (error) {
        }
    };

    const fetchUserPurchases = async () => {
        try {
            const response = await networkRequest({
                endpoint: `SalesReport/GetUserPurchases`,
                method: 'GET'
            });

            setUserPurchases(response.$values);
        } catch (error) {
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Sales Report</h1>
            <div role="tablist" className="tabs tabs-bordered">
                <a role="tab" className={`tab ${activeTab === 'weekly' ? 'tab-active' : ''}`} onClick={() => setActiveTab('weekly')}>Weekly</a>
                <a role="tab" className={`tab ${activeTab === 'monthly' ? 'tab-active' : ''}`} onClick={() => setActiveTab('monthly')}>Monthly</a>
                <a role="tab" className={`tab ${activeTab === 'yearly' ? 'tab-active' : ''}`} onClick={() => setActiveTab('yearly')}>Yearly</a>
            </div>
            <div className="sales-report">
                <h2 className="text-3xl font-bold my-4">Sales Report</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Total Sales</th>
                                <th>Items Sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(salesReport) && salesReport.map((report:any, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(report.orderDate).toLocaleDateString()}</td>
                                    <td>{report.totalSales ? report.totalSales.toFixed(2) : '0.00'} TL</td>
                                    <td>{report.itemsSold}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h2 className="text-3xl font-bold my-4">Your Purchases</h2>
            <div className="user-purchases">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Purchase Date</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(userPurchases) && userPurchases.map((purchase:any, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                                    <td>{purchase.productName}</td>
                                    <td>{purchase.price ? purchase.price.toFixed(2) : '0.00'} TL</td>
                                    <td>{purchase.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalesReportPage;
