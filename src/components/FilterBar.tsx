import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: {
    periodo: string;
    startDate: string;
    endDate: string;
    statusCampanha: string;
    localidade: string;
    doadores: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const filterOptions = {
    periodo: ['Último mês', 'Últimos 3 meses', 'Último ano', 'Personalizado'],
    statusCampanha: ['Todos', 'Ativa', 'Inativa', 'Encerrada'],
    localidade: ['Todas', 'Campinas', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
    doadores: ['Todos', 'Novos', 'Recorrentes', 'Antigos']
  };

  const filterLabels = {
    periodo: 'Período',
    startDate: 'Data Inicial',
    endDate: 'Data Final',
    statusCampanha: 'Status da Campanha',
    localidade: 'Localidade',
    doadores: 'Doadores'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Period Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {filterLabels.periodo}
          </label>
          <div className="relative">
            <select
              value={filters.periodo}
              onChange={(e) => onFilterChange('periodo', e.target.value)}
              className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 pr-8 text-sm font-medium appearance-none cursor-pointer hover:bg-blue-600 transition-colors"
            >
              {filterOptions.periodo.map((option) => (
                <option key={option} value={option} className="bg-white text-gray-900">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            {filterLabels.startDate}
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange('startDate', e.target.value)}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:bg-blue-600 transition-colors"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {filterLabels.endDate}
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange('endDate', e.target.value)}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium cursor-pointer hover:bg-blue-600 transition-colors"
          />
        </div>

        {/* Other Filters */}
        {['statusCampanha', 'localidade', 'doadores'].map((key) => (
          <div key={key} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {filterLabels[key as keyof typeof filterLabels]}
            </label>
            <div className="relative">
              <select
                value={filters[key as keyof typeof filters]}
                onChange={(e) => onFilterChange(key, e.target.value)}
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 pr-8 text-sm font-medium appearance-none cursor-pointer hover:bg-blue-600 transition-colors"
              >
                {filterOptions[key as keyof typeof filterOptions].map((option) => (
                  <option key={option} value={option} className="bg-white text-gray-900">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;