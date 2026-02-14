import { ArrowLeft, Calendar, MapPin, Plane, Clock, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { motion } from 'motion/react';
import { FlightEntry } from './LogbookDashboard';

interface FlightDetailsScreenProps {
  flight: FlightEntry;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function FlightDetailsScreen({ flight, onBack, onEdit, onDelete }: FlightDetailsScreenProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 rounded-full hover:bg-white/20 text-white active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl">Flight Details</h1>
              <p className="text-blue-100 text-sm">View flight information</p>
            </div>
          </div>
        </div>

        {/* Route Display */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mt-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center flex-1">
              <div className="text-3xl mb-1">{flight.departure}</div>
              <div className="text-xs text-blue-100">Departure</div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <Plane className="h-6 w-6 transform rotate-90" />
            </div>
            <div className="text-center flex-1">
              <div className="text-3xl mb-1">{flight.arrival}</div>
              <div className="text-xs text-blue-100">Arrival</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* Date and Time Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3 mt-1">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Flight Date</div>
                    <div className="text-base">{formatDate(flight.date)}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3 mt-1">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Flight Duration</div>
                    <div className="text-base">{formatTime(flight.flightTime)}</div>
                    <div className="text-xs text-gray-500 mt-1">{flight.flightTime.toFixed(2)} decimal hours</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Details Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-3 mt-1">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">Route</div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-base px-4 py-2 border-blue-600 text-blue-700">
                      {flight.departure}
                    </Badge>
                    <span className="text-gray-400">→</span>
                    <Badge variant="outline" className="text-base px-4 py-2 border-blue-600 text-blue-700">
                      {flight.arrival}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aircraft Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-3 mt-1">
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">Aircraft Type</div>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-base px-4 py-2">
                    {flight.aircraft}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Card - Only show if notes exist */}
          {flight.notes && (
            <Card className="border-l-4 border-l-gray-400">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 rounded-full p-3 mt-1">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-2">Flight Notes</div>
                    <div className="text-base leading-relaxed text-gray-700">
                      {flight.notes}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Spacer for bottom buttons */}
          <div className="h-24"></div>
        </motion.div>
      </div>

      {/* Fixed Action Buttons at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg z-20 pb-safe safe-area-bottom">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onEdit}
            variant="outline"
            className="h-14 text-base border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-98 transition-transform rounded-2xl"
            size="lg"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit
          </Button>
          <Button
            onClick={onDelete}
            variant="destructive"
            className="h-14 text-base active:scale-98 transition-transform rounded-2xl"
            size="lg"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
