import { useState } from 'react';
import { ArrowLeft, Save, Plane, MapPin, Clock, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { FlightEntry } from './LogbookDashboard';

interface AddFlightScreenProps {
  onBack: () => void;
  onSave: (flight: Omit<FlightEntry, 'id'>) => void;
  editingFlight?: FlightEntry;
}

export function AddFlightScreen({ onBack, onSave, editingFlight }: AddFlightScreenProps) {
  const [date, setDate] = useState(editingFlight?.date || new Date().toISOString().split('T')[0]);
  const [departure, setDeparture] = useState(editingFlight?.departure || '');
  const [arrival, setArrival] = useState(editingFlight?.arrival || '');
  const [aircraft, setAircraft] = useState(editingFlight?.aircraft || '');
  const [hours, setHours] = useState(editingFlight ? Math.floor(editingFlight.flightTime).toString() : '');
  const [minutes, setMinutes] = useState(editingFlight ? Math.round((editingFlight.flightTime % 1) * 60).toString() : '');
  const [notes, setNotes] = useState(editingFlight?.notes || '');

  const handleSave = () => {
    // Validation
    if (!date || !departure || !arrival || !aircraft || !hours) {
      toast.error('Please fill in all required fields');
      return;
    }

    const totalHours = parseFloat(hours) + (parseFloat(minutes || '0') / 60);

    if (totalHours <= 0 || totalHours > 24) {
      toast.error('Flight time must be between 0 and 24 hours');
      return;
    }

    const flightData: Omit<FlightEntry, 'id'> = {
      date,
      departure: departure.toUpperCase(),
      arrival: arrival.toUpperCase(),
      aircraft: aircraft.toUpperCase(),
      flightTime: totalHours,
      notes,
    };

    onSave(flightData);
    toast.success(editingFlight ? 'Flight updated successfully' : 'Flight added successfully');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-6 shadow-lg">
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
            <h1 className="text-2xl">{editingFlight ? 'Edit Flight' : 'Add Flight'}</h1>
            <p className="text-blue-100 text-sm">Log your flight details</p>
          </div>
        </div>
      </div>

      {/* Form Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Date Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                </div>
                <Label htmlFor="date" className="text-base m-0">Flight Date *</Label>
              </div>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 text-base border-gray-300 focus:border-blue-600"
                max={new Date().toISOString().split('T')[0]}
                required
                aria-required="true"
              />
            </CardContent>
          </Card>

          {/* Route Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <Label className="text-base m-0">Route *</Label>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="departure" className="text-sm text-gray-600 mb-2 block">Departure Airport</Label>
                  <Input
                    id="departure"
                    type="text"
                    placeholder="e.g., KJFK"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-600 uppercase"
                    maxLength={4}
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="arrival" className="text-sm text-gray-600 mb-2 block">Arrival Airport</Label>
                  <Input
                    id="arrival"
                    type="text"
                    placeholder="e.g., KLAX"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-600 uppercase"
                    maxLength={4}
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aircraft Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <Label htmlFor="aircraft" className="text-base m-0">Aircraft Type *</Label>
              </div>
              <Input
                id="aircraft"
                type="text"
                placeholder="e.g., B737, A320, C172"
                value={aircraft}
                onChange={(e) => setAircraft(e.target.value)}
                className="h-12 text-base border-gray-300 focus:border-blue-600 uppercase"
                required
                aria-required="true"
              />
            </CardContent>
          </Card>

          {/* Flight Time Card */}
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <Label className="text-base m-0">Flight Time *</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours" className="text-sm text-gray-600 mb-2 block">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-600"
                    min="0"
                    max="23"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="minutes" className="text-sm text-gray-600 mb-2 block">Minutes</Label>
                  <Input
                    id="minutes"
                    type="number"
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-blue-600"
                    min="0"
                    max="59"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Card */}
          <Card className="border-l-4 border-l-gray-400">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
                <Label htmlFor="notes" className="text-base m-0">Notes (Optional)</Label>
              </div>
              <Textarea
                id="notes"
                placeholder="Add any flight notes, weather conditions, or remarks..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] text-base border-gray-300 focus:border-blue-600 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-2">{notes.length}/500 characters</p>
            </CardContent>
          </Card>

          {/* Spacer for bottom button */}
          <div className="h-24"></div>
        </motion.div>
      </div>

      {/* Fixed Save Button at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <Button
          onClick={handleSave}
          className="w-full h-14 text-base bg-blue-600 hover:bg-blue-700 active:scale-98 transition-transform rounded-2xl"
          size="lg"
        >
          <Save className="h-5 w-5 mr-2" />
          {editingFlight ? 'Update Flight' : 'Save Flight'}
        </Button>
      </div>
    </div>
  );
}
