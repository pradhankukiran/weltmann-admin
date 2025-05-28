import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Star, ShoppingCart, AlertCircle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import ConfirmationModal from './ConfirmationModal';
import AudioPlayer from './AudioPlayer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface CallDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  call: {
    id: string;
    timestamp: string;
    duration: number;
    callerId: string;
    agentName: string;
    outcome: 'resolved' | 'escalated' | 'abandoned';
    shopwareActivity: boolean;
    shopwareSuccess?: boolean;
  };
}

interface TranscriptEntry {
  speaker: 'AI Agent' | 'Caller';
  text: string;
  timestamp: string;
  intent?: string;
  entities?: Array<{
    type: string;
    value: string;
  }>;
}

interface ShopwareInteraction {
  timestamp: string;
  endpoint: string;
  parameters: Record<string, any>;
  response: Record<string, any>;
  success: boolean;
}

// Mock data - replace with actual API data
const mockTranscript: TranscriptEntry[] = [
  {
    speaker: 'AI Agent',
    text: 'Hello! How can I help you today?',
    timestamp: '00:00'
  },
  {
    speaker: 'Caller',
    text: 'Hi, I\'m calling about my recent order.',
    timestamp: '00:03',
    intent: 'check_order_status',
    entities: [
      { type: 'intent_type', value: 'order_inquiry' }
    ]
  },
  {
    speaker: 'AI Agent',
    text: 'I\'d be happy to help you with that. Could you please provide your order number?',
    timestamp: '00:07'
  }
];

const mockShopwareInteractions: ShopwareInteraction[] = [
  {
    timestamp: '00:08',
    endpoint: '/api/orders',
    parameters: { orderId: '12345' },
    response: { status: 'Shipped', trackingNumber: 'ABC123' },
    success: true,
  },
  {
    timestamp: '00:15',
    endpoint: '/api/products',
    parameters: { sku: 'XYZ-789' },
    response: { error: '404 Product Not Found' },
    success: false,
  },
];

const CallDetailView: React.FC<CallDetailViewProps> = ({ isOpen, onClose, call }) => {
  const [currentTab, setCurrentTab] = useState('transcript');
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [audioError, setAudioError] = useState<Error | null>(null);
  // Mock audio URL - replace with actual API integration later
  const mockAudioUrl = 'https://example.com/mock-audio.mp3';

  const handleSendFeedback = () => {
    // TODO: Implement API integration
    console.log('Feedback:', {
      rating,
      feedback,
      notes
    });
    onClose();
  };

  const handleDeleteConversation = () => {
    // TODO: Implement API integration
    console.log('Deleting conversation:', call.id);
    setShowDeleteConfirmation(false);
    onClose();
  };

  const handleAudioError = (error: Error) => {
    setAudioError(error);
    console.error('Audio playback error:', error);
  };

  return (
    <>
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]" />
        <Dialog.Content 
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100%-2rem)] max-w-4xl h-[85vh] bg-white rounded-xl shadow-xl will-change-transform overflow-hidden z-[151]"
          aria-describedby={`call-${call.id}-description`}
        >
          <Dialog.Title asChild>
            <VisuallyHidden>Call Details for {call.id}</VisuallyHidden>
          </Dialog.Title>
          <div className="h-full flex flex-col animate-fadeIn">
            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide overscroll-contain">
              <div className="p-6">
              {/* Summary Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{new Date(call.timestamp).toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-yellow-600">{Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Caller ID</p>
                  <p className="font-medium">{call.callerId}</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Agent</p>
                  <p className="font-medium text-primary">{call.agentName}</p>
                </div>
              </div>

              <Tabs.Root defaultValue="transcript" className="space-y-6" onValueChange={setCurrentTab}>
                <div className="flex items-center justify-between border-b border-gray-200 sticky top-0 bg-white z-10 will-change-transform p-4">
                  <div>
                    <span className="font-medium text-gray-900">Call {call.id}</span>
                  </div>

                  <div className="flex-grow flex justify-center">
                    <div className="bg-gray-100/50 p-1 rounded-lg">
                      <Tabs.List className="flex gap-2">
                        <Tabs.Trigger
                          value="transcript"
                          className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            currentTab === 'transcript'
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-600 hover:bg-gray-200/50'
                          }`}
                        >
                          Transcript
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          value="audio"
                          className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            currentTab === 'audio'
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-600 hover:bg-gray-200/50'
                          }`}
                        >
                          Audio
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          value="shopware"
                          className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            currentTab === 'shopware'
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-600 hover:bg-gray-200/50'
                          }`}
                        >
                          Shopware Activity
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          value="feedback"
                          className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            currentTab === 'feedback'
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-gray-600 hover:bg-gray-200/50'
                          }`}
                        >
                          Feedback
                        </Tabs.Trigger>
                      </Tabs.List>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setShowDeleteConfirmation(true)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete Conversation
                    </button>
                  </div>
                </div>

                <Tabs.Content value="transcript" className="focus:outline-none pt-2">
                  <div className="space-y-4 will-change-transform">
                    {mockTranscript.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex gap-4 ${
                          entry.speaker === 'AI Agent' ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <div className="shrink-0 w-24 text-sm text-gray-500">
                          {entry.timestamp}
                        </div>
                        <div
                          className={`flex-1 p-4 rounded-lg ${
                            entry.speaker === 'AI Agent'
                              ? 'bg-primary/5 text-primary'
                              : 'bg-gray-100'
                          }`}>
                          <p className="text-sm font-medium mb-1">{entry.speaker}</p>
                          <p>{entry.text}</p>
                          {entry.intent && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs font-medium text-gray-500">
                                Intent: <span className="text-primary">{entry.intent}</span>
                              </p>
                              {entry.entities && entry.entities.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {entry.entities.map((entity, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                      {entity.type}: {entity.value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Tabs.Content>

                <Tabs.Content value="audio" className="focus:outline-none pt-2">
                  <AudioPlayer 
                    audioUrl={mockAudioUrl}
                    onError={handleAudioError}
                  />
                  {audioError && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                      <AlertCircle size={20} />
                      <span>Failed to load audio recording. Please try again later.</span>
                    </div>
                  )}
                </Tabs.Content>

                <Tabs.Content value="shopware" className="focus:outline-none pt-2">
                  {call.shopwareActivity ? (
                    <div className="space-y-4 will-change-transform">
                      {mockShopwareInteractions.map((interaction, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ShoppingCart
                              size={16}
                              className={interaction.success ? 'text-green-500' : 'text-red-500'}
                            />
                            <span className="text-sm text-gray-500">{interaction.timestamp}</span>
                          </div>
                          <p className="font-mono text-sm mb-2">{interaction.endpoint}</p>
                          <div className="bg-gray-50 rounded p-2 mb-2">
                            <p className="text-sm font-medium">Parameters:</p>
                            <pre className="text-xs">{JSON.stringify(interaction.parameters, null, 2)}</pre>
                          </div>
                          <div className={`rounded p-2 ${
                            interaction.success ? 'bg-green-50' : 'bg-red-50'
                          }`}>
                            <p className="text-sm font-medium">Response:</p>
                            <pre className="text-xs">{JSON.stringify(interaction.response, null, 2)}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500 p-4 bg-gray-50 rounded-lg">
                      <AlertCircle size={20} />
                      <span>No Shopware data accessed for this call.</span>
                    </div>
                  )}
                </Tabs.Content>

                <Tabs.Content value="feedback" className="focus:outline-none pt-2">
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium mb-3">Rate this conversation</p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setFeedback('positive')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                            feedback === 'positive'
                              ? 'bg-green-50 border-green-200 text-green-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <ThumbsUp size={20} />
                          <span>Good</span>
                        </button>
                        <button
                          onClick={() => setFeedback('negative')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                            feedback === 'negative'
                              ? 'bg-red-50 border-red-200 text-red-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <ThumbsDown size={20} />
                          <span>Needs Improvement</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-3">Star Rating</p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`p-1 rounded-lg hover:bg-gray-100 ${
                              rating >= star ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            <Star size={24} fill="currentColor" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium mb-3">Internal Notes</p>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add internal notes or tags for this call..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                      />
                    </div>

                    <button
                      onClick={handleSendFeedback}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Save Feedback
                    </button>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    
    <ConfirmationModal
      isOpen={showDeleteConfirmation}
      title="Delete Conversation"
      message={`Are you sure you want to delete this conversation? This action cannot be undone.`}
      confirmLabel="Delete"
      onConfirm={handleDeleteConversation}
      onCancel={() => setShowDeleteConfirmation(false)}
    />
    </>
  );
};

export default CallDetailView;