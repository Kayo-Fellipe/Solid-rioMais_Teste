import React from 'react';

interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
}

interface RecentDonationsProps {
  donations: Donation[];
}

const RecentDonations: React.FC<RecentDonationsProps> = ({ donations }) => {
  return (
    <div className="bg-blue-500 rounded-xl p-4 sm:p-6 text-white">
      <h3 className="text-lg font-semibold mb-6">Doações Recentes</h3>
      
      <div className="space-y-1 mb-4 hidden sm:block">
        <div className="flex justify-between text-xs sm:text-sm font-medium text-blue-100 pb-2">
          <span>Doador</span>
          <span>Valor</span>
          <span>Data</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {donations.map((donation) => (
          <div key={donation.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-blue-400 last:border-b-0 gap-2 sm:gap-0">
            <div className="flex-1 min-w-0">
              <span className="font-medium text-xs sm:text-sm truncate block">{donation.donor}</span>
            </div>
            <div className="flex justify-between sm:flex-1 sm:justify-center">
              <span className="font-semibold text-xs sm:text-sm">
                R$ {donation.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs sm:text-sm text-blue-100 sm:hidden">{donation.date}</span>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:justify-end">
              <span className="text-xs sm:text-sm text-blue-100">{donation.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDonations;