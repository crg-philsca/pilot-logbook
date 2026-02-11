import { TrendingUp, Clock, Plane, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FlightEntry } from './LogbookDashboard';

interface StatisticsScreenProps {
  flights: FlightEntry[];
}

export function StatisticsScreen({ flights }: StatisticsScreenProps) {
  const totalFlights = flights.length;
  const totalHours = flights.reduce((sum, flight) => sum + flight.flightTime, 0);
  
  const uniqueAircraft = new Set(flights.map(f => f.aircraft)).size;
  const uniqueAirports = new Set([
    ...flights.map(f => f.departure),
    ...flights.map(f => f.arrival)
  ]).size;

  const aircraftBreakdown = flights.reduce((acc, flight) => {
    acc[flight.aircraft] = (acc[flight.aircraft] || 0) + flight.flightTime;
    return acc;
  }, {} as Record<string, number>);

  const topAircraft = Object.entries(aircraftBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Hours',
      value: totalHours.toFixed(1),
      icon: Clock,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Flights',
      value: totalFlights.toString(),
      icon: TrendingUp,
      color: 'green',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Aircraft Types',
      value: uniqueAircraft.toString(),
      icon: Plane,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Airports Visited',
      value: uniqueAirports.toString(),
      icon: MapPin,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 pt-8 pb-6 shadow-lg">
        <h1 className="text-2xl mb-1">Statistics</h1>
        <p className="text-blue-100 text-sm">Your flight summary</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-0 shadow-md">
                <CardContent className="p-5">
                  <div className={`${stat.bgColor} rounded-full p-3 w-fit mb-3`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <div className="text-3xl mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Aircraft Breakdown */}
        {topAircraft.length > 0 && (
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-600" />
                Hours by Aircraft
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topAircraft.map(([aircraft, hours]) => {
                const percentage = (hours / totalHours) * 100;
                return (
                  <div key={aircraft}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">{aircraft}</span>
                      <span className="text-sm text-gray-600">
                        {hours.toFixed(1)}h ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {totalFlights === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-blue-100 rounded-full p-6 mb-4">
              <TrendingUp className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-lg mb-2 text-gray-800">No statistics yet</h3>
            <p className="text-gray-600 px-8">
              Add flights to your logbook to see your flight statistics
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
