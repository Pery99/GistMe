import React, { useState } from 'react';
import { HiBell, HiMoon, HiGlobe, HiLockClosed, HiColorSwatch, HiVolumeUp } from 'react-icons/hi';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    messagePreview: true,
    soundEnabled: true,
    language: 'en',
    privacy: {
      profileVisibility: 'public',
      onlineStatus: 'show',
      lastSeen: 'contacts'
    },
    theme: 'default'
  });

  // Helper function to safely get nested values
  const getSettingValue = (key) => {
    const keys = key.split('.');
    let value = settings;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return false; // default value
    }
    return value;
  };

  // Helper function to safely update settings
  const updateSetting = (key, value) => {
    const keys = key.split('.');
    setSettings(prev => {
      if (keys.length === 1) {
        return { ...prev, [key]: value };
      }
      
      return {
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value
        }
      };
    });
  };

  const settingsSections = [
    {
      title: 'Appearance',
      icon: <HiColorSwatch className="w-6 h-6" />,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          type: 'toggle',
          description: 'Enable dark mode for a better night experience'
        },
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          options: ['default', 'modern', 'minimal'],
          description: 'Choose your preferred theme'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: <HiBell className="w-6 h-6" />,
      settings: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          type: 'toggle',
          description: 'Receive notifications for new messages'
        },
        {
          key: 'soundEnabled',
          label: 'Sound Effects',
          type: 'toggle',
          icon: <HiVolumeUp />,
          description: 'Play sounds for new messages and calls'
        }
      ]
    },
    {
      title: 'Privacy',
      icon: <HiLockClosed className="w-6 h-6" />,
      settings: [
        {
          key: 'privacy.profileVisibility',
          label: 'Profile Visibility',
          type: 'select',
          options: ['public', 'friends', 'private'],
          description: 'Control who can see your profile'
        },
        {
          key: 'privacy.onlineStatus',
          label: 'Online Status',
          type: 'select',
          options: ['show', 'hide'],
          description: 'Show or hide your online status'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-8">
        Settings
      </h1>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} 
               className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-50 rounded-xl text-primary-600">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {section.settings.map((setting) => (
                <div key={setting.key} className="flex items-start justify-between">
                  <div className="space-y-1">
                    <label className="font-medium text-gray-900">{setting.label}</label>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  {setting.type === 'toggle' ? (
                    <button
                      onClick={() => updateSetting(setting.key, !getSettingValue(setting.key))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${getSettingValue(setting.key) ? 'bg-primary-600' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${getSettingValue(setting.key) ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  ) : (
                    <select
                      value={getSettingValue(setting.key)}
                      onChange={(e) => updateSetting(setting.key, e.target.value)}
                      className="form-select rounded-lg border-gray-200 bg-gray-50/50 focus:border-primary-500"
                    >
                      {setting.options.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
