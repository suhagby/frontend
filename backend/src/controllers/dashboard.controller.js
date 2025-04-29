// Dashboard controller to provide analytics data

// Get CRM dashboard data
exports.getCrmDashboard = async (req, res) => {
  try {
    // In a real application, this would fetch data from the database
    // For now, we'll return mock data that matches the frontend
    const dashboardData = {
      congratulations: {
        name: "Norris",
        subtitle: "Best seller of the month",
        sales: "$42.8k",
        salesPercentage: "78%",
        target: "of target 🚀"
      },
      statistics: [
        {
          title: "Total Orders",
          stats: "155k",
          growth: "+22%",
          subtitle: "Last 4 Month"
        },
        {
          title: "Total Sales",
          stats: "$13.4k",
          growth: "+38%",
          subtitle: "Last Six Months"
        }
      ],
      totalProfit: {
        stats: "$88.5k",
        trend: "-18%"
      },
      totalGrowth: {
        stats: "$27.9k",
        trend: "+16%"
      },
      weeklyOverview: {
        salesPerformance: "62%",
        comparedText: "Your sales performance is 45% 😎 better compared to last month"
      },
      socialNetworkVisits: {
        total: "$24,895",
        percentage: "62%",
        subtitle: "Last 1 Year Visits",
        networks: [
          {
            name: "Facebook",
            type: "Social Media",
            visits: "12,348",
            growth: "+12%"
          },
          {
            name: "Dribbble",
            type: "Community",
            visits: "8,450",
            growth: "+32%"
          },
          {
            name: "Twitter",
            type: "Social Media",
            visits: "350",
            growth: "-8%"
          },
          {
            name: "Instagram",
            type: "Social Media",
            visits: "25,566",
            growth: "+45%"
          }
        ]
      },
      meetingSchedule: [
        {
          avatar: "/images/avatars/4.png",
          title: "Call with Woods",
          date: "21 Jul | 08:20-10:30",
          type: "Business"
        },
        {
          avatar: "/images/avatars/5.png",
          title: "Conference call",
          date: "24 Jul | 11:30-12:00",
          type: "Meditation"
        },
        {
          avatar: "/images/avatars/3.png",
          title: "Meeting with Mark",
          date: "28 Jul | 05:00-6:45",
          type: "Dinner"
        },
        {
          avatar: "/images/avatars/2.png",
          title: "Meeting with Oakland",
          date: "03 Aug | 07:00-8:30",
          type: "Meetup"
        }
      ],
      salesByCountries: {
        total: "$24,895",
        growth: "+42%",
        subtitle: "Sales Last 90 Days",
        countries: [
          { name: "Australia", sales: "18,879", percentage: "15%" },
          { name: "Canada", sales: "10,357", percentage: "85%" },
          { name: "India", sales: "4,860", percentage: "88%" },
          { name: "US", sales: "899", percentage: "16%" },
          { name: "Japan", sales: "43", percentage: "35%" },
          { name: "Brazil", sales: "18", percentage: "12%" }
        ]
      },
      users: [
        {
          id: 1,
          name: "Galen Slixby",
          username: "gslixby0",
          email: "gslixby0@abc.net.au",
          role: "Editor",
          status: "Inactive"
        },
        {
          id: 2,
          name: "Halsey Redmore",
          username: "hredmore1",
          email: "hredmore1@imgur.com",
          role: "Author",
          status: "Pending",
          avatar: "/images/avatars/3.png"
        },
        {
          id: 3,
          name: "Marjory Sicely",
          username: "msicely2",
          email: "msicely2@who.int",
          role: "Maintainer",
          status: "Active",
          avatar: "/images/avatars/1.png"
        }
      ]
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Get CRM dashboard error:', error);
    res.status(500).json({ message: 'Failed to get dashboard data', error: error.message });
  }
};

// Get Analytics dashboard data
exports.getAnalyticsDashboard = async (req, res) => {
  try {
    // Mock data for analytics dashboard
    const analyticsData = {
      // Analytics specific data would go here
      websiteAnalytics: {
        sessions: 28458,
        pageviews: 56385,
        conversionRate: "3.25%",
        bounceRate: "42.3%"
      },
      // Add more analytics data as needed
    };

    res.json(analyticsData);
  } catch (error) {
    console.error('Get Analytics dashboard error:', error);
    res.status(500).json({ message: 'Failed to get analytics data', error: error.message });
  }
};

// Get eCommerce dashboard data
exports.getEcommerceDashboard = async (req, res) => {
  try {
    // Mock data for eCommerce dashboard
    const ecommerceData = {
      // eCommerce specific data would go here
      sales: {
        total: "$24,895",
        growth: "+18%",
        lastMonth: "$20,495"
      },
      // Add more eCommerce data as needed
    };

    res.json(ecommerceData);
  } catch (error) {
    console.error('Get eCommerce dashboard error:', error);
    res.status(500).json({ message: 'Failed to get eCommerce data', error: error.message });
  }
};