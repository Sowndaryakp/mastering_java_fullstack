import React from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const colors = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  warning: 'bg-yellow-50 text-yellow-800',
  info: 'bg-blue-50 text-blue-800',
};

const iconColors = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
};

const Notification = ({ type = 'info', title, message, onClose, onClick }) => {
  const Icon = icons[type];

  return (
    <div
      className={`rounded-md p-4 ${colors[type]} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
      role={onClick ? 'button' : 'alert'}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColors[type]}`} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${colors[type]}`}>{title}</h3>
          )}
          <div className={`text-sm ${title ? 'mt-2' : ''}`}>{message}</div>
        </div>
        {onClose && (
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              className={`rounded-md ${colors[type]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification; 