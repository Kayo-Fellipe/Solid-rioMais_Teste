import React from 'react';
import { Heart, Users, Calendar, Target } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  description: string;
  status: 'Ativa' | 'Encerrada' | 'Inativa';
  raised: number;
  goal: number;
  progress: number;
  donations: number;
  date: string;
  category: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  onClick: (campaignId: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa':
        return 'bg-green-100 text-green-800';
      case 'Encerrada':
        return 'bg-blue-100 text-blue-800';
      case 'Inativa':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
      onClick={() => onClick(campaign.id)}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
        <div className="flex items-start space-x-3 sm:space-x-4 w-full">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {campaign.title}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{campaign.category}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{campaign.donations} doações</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{campaign.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Progresso</span>
          <span className="font-medium text-gray-900">{campaign.progress.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(campaign.progress)}`}
            style={{ width: `${Math.min(campaign.progress, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500 text-xs sm:text-sm">Arrecadado: </span>
            <span className="font-semibold text-gray-900 text-xs sm:text-sm">
              R$ {campaign.raised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-gray-500 text-xs sm:text-sm">Meta: </span>
            <span className="font-semibold text-gray-900 text-xs sm:text-sm">
              R$ {campaign.goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;