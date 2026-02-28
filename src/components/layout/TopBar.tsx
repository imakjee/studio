import { Phone, Clock, MapPin } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-primary text-white py-2 hidden md:block w-full">
      <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>0800 123 4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-accent" />
            <span>Open 7 days a week</span>
          </div>
        </div>
        <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer">
          <MapPin className="w-3 h-3" />
          <span>Find a Branch</span>
        </div>
      </div>
    </div>
  );
}
