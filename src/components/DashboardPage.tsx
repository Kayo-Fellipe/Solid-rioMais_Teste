import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Target, CheckCircle, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './dashboard/DashboardCard';
import WeeklyChart from './WeeklyChart';
import TopCampaigns from './TopCampaigns';
import TopDonors from './TopDonors';
import RecentDonations from './RecentDonations';
import CampaignsList from './CampaignsList';
import HighlightBanner from './HighlightBanner';
import {
  evolutionData,
  distributionData,
  weeklyData,
  topCampaigns,
  topDonors,
  recentDonations,
  campaignsList
} from '../data/dashboardData';

interface DashboardPageProps {
  onCampaignClick: (campaignId: number) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onCampaignClick }) => {
  const navigate = useNavigate();

  // Calculate metrics from campaigns data
  const totalRaised = campaignsList.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalDonations = campaignsList.reduce((sum, campaign) => sum + campaign.donations, 0);
  const activeCampaigns = campaignsList.filter(campaign => campaign.status === 'Ativa').length;
  const completedCampaigns = campaignsList.filter(campaign => campaign.status === 'Encerrada').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Home Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">Acompanhe o desempenho de suas campanhas</p>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao Site
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Arrecadado"
            value={`R$ ${totalRaised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
            description="Valor total arrecadado"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white"
          />
          <DashboardCard
            title="Total de Doações"
            value={totalDonations.toString()}
            icon={TrendingUp}
            description="Número total de doações"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          />
          <DashboardCard
            title="Campanhas Ativas"
            value={activeCampaigns.toString()}
            icon={Target}
            description="Campanhas em andamento"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
          />
          <DashboardCard
            title="Campanhas Concluídas"
            value={completedCampaigns.toString()}
            icon={CheckCircle}
            description="Campanhas finalizadas"
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          />
        </div>

        {/* Highlight Banner */}
        <HighlightBanner message="Este mês, 45% das doações vieram da campanha Emergencial" />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="lg:col-span-1">
            <WeeklyChart data={weeklyData} />
          </div>
          <TopCampaigns campaigns={topCampaigns} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RecentDonations donations={recentDonations} />
          <TopDonors donors={topDonors} />
        </div>

        {/* Campaigns List */}
        <CampaignsList campaigns={campaignsList} onCampaignClick={onCampaignClick} />
      </div>
    </div>
  );
};

export default DashboardPage;