import { useState } from 'react';
import { Plus, Search, Plane, Clock, MapPin, Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export interface FlightEntry {
  id: string;
  date: string;
  departure: string;
  arrival: string;
  aircraft: string;
  flightTime: number;
  notes: string;
}

interface LogbookDashboardProps {
  flights: FlightEntry[];
  onFlightClick: (flight: FlightEntry) => void;
  onAddFlight: () => void;
  totalHours: number;
}

export function LogbookDashboard({ flights, onFlightClick, onAddFlight, totalHours }: LogbookDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const filteredFlights = flights.filter(flight =>
    flight.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.arrival.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.aircraft.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Header with Summary Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 pt-8 pb-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1 tracking-tight">Logbook</h1>
            <p className="text-blue-100/80 text-sm font-medium">Flight Deck</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white/80"
              aria-label="Refresh App"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 text-center border border-white/10">
              <div className="text-2xl font-bold tracking-tight">{totalHours.toFixed(1)}</div>
              <div className="text-[10px] uppercase tracking-wider text-blue-100 font-semibold">Hours</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search flights, routes, aircraft..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 rounded-2xl border-0 shadow-md bg-white text-base"
            aria-label="Search flights"
          />
        </div>
      </div>

      {/* Flight List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-32">
        {filteredFlights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full p-8 mb-6 shadow-md">
              <Plane className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-xl mb-3 text-gray-800">
              {searchQuery ? 'No flights found' : 'No flights logged yet'}
            </h3>
            <p className="text-gray-600 mb-8 px-4 leading-relaxed">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Start building your logbook by adding your first flight'}
            </p>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-600 active:scale-98"
                onClick={() => onFlightClick(flight)}
                role="button"
                tabIndex={0}
                aria-label={`Flight from ${flight.departure} to ${flight.arrival}`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    {/* Upper Part: Route & Time */}
                    <div className="p-5 flex justify-between items-center border-b border-gray-100">
                      <div className="flex flex-col items-start min-w-0 flex-1 mr-4">
                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(flight.date)}</span>
                        </div>
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-xl font-bold text-gray-900 truncate max-w-[40%] text-right">{flight.departure}</span>
                          <Plane className="h-4 w-4 text-blue-400 rotate-90 flex-shrink-0" />
                          <span className="text-xl font-bold text-gray-900 truncate max-w-[40%]">{flight.arrival}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end pl-4 border-l border-gray-100">
                        <span className="text-2xl font-black text-blue-600 tracking-tight leading-none">
                          {formatTime(flight.flightTime).split(' ')[0]}
                        </span>
                        <span className="text-xs text-gray-400 font-medium lowercase">
                          {formatTime(flight.flightTime).split(' ')[1]}
                        </span>
                      </div>
                    </div>

                    {/* Lower Part: Details */}
                    <div className="px-5 py-3 bg-gray-50/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                          {flight.aircraft}
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs font-medium">Total Time</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-24 right-6 z-10">
        <Button
          onClick={onAddFlight}
          size="lg"
          className="h-16 w-16 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform"
          aria-label="Add new flight"
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}