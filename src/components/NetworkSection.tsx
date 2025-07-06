import React, { useState } from 'react';
import { NetworkNode } from './NetworkNode';
import { InfoModal } from './InfoModal';
import { NetworkNode as NetworkNodeType } from '../types/music';

interface NetworkSectionProps {
  nodes: NetworkNodeType[];
  onExpandPerson: (nodeId: string) => void;
  onExpandSong: (song: any, parentId: string) => void;
  onExpandCollaborator: (collaborator: any, parentId: string) => void;
  stats: { nodes: number; connections: number };
}

export function NetworkSection({ 
  nodes, 
  onExpandPerson, 
  onExpandSong, 
  onExpandCollaborator, 
  stats 
}: NetworkSectionProps) {
  const [selectedNode, setSelectedNode] = useState<NetworkNodeType | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfo = (node: NetworkNodeType) => {
    setSelectedNode(node);
    setShowInfoModal(true);
  };

  const handleCloseInfo = () => {
    setShowInfoModal(false);
    setSelectedNode(null);
  };

  if (nodes.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold font-terminal">🕸️ Music Network</h2>
            <div className="text-sm font-semibold font-body">Nodes: 0 | Connections: 0</div>
          </div>
          
          <div className="p-16 text-center text-gray-500">
            <div className="text-6xl mb-4 animate-bounce">🎯</div>
            <h3 className="text-xl font-semibold mb-2 font-terminal">Start exploring by searching for an artist!</h3>
            <p className="font-body">Try: "Jung Kook", "Tony Esterly", "aespa"</p>
          </div>
        </div>
      </section>
    );
  }

  // Group nodes by level for better visualization
  const nodesByLevel: { [key: number]: NetworkNodeType[] } = {};
  
  nodes.forEach(node => {
    const level = getNodeLevel(node, nodes);
    if (!nodesByLevel[level]) nodesByLevel[level] = [];
    nodesByLevel[level].push(node);
  });

  return (
    <>
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold font-terminal">🕸️ Music Network</h2>
            <div className="text-sm font-semibold font-body">
              Nodes: {stats.nodes} | Connections: {stats.connections}
            </div>
          </div>
          
          <div className="p-8 overflow-x-auto">
            <div className="flex gap-8 min-w-fit">
              {Object.keys(nodesByLevel)
                .sort((a, b) => Number(a) - Number(b))
                .map(level => (
                  <div key={level} className="flex flex-col gap-6 min-w-[300px] relative">
                    {/* Level Connection Lines */}
                    {Number(level) > 0 && (
                      <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-transparent opacity-20"></div>
                    )}
                    
                    {nodesByLevel[Number(level)].map(node => (
                      <NetworkNode
                        key={node.id}
                        node={node}
                        onExpandPerson={onExpandPerson}
                        onExpandSong={onExpandSong}
                        onExpandCollaborator={onExpandCollaborator}
                        onShowInfo={handleShowInfo}
                      />
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <InfoModal
        isOpen={showInfoModal}
        onClose={handleCloseInfo}
        node={selectedNode}
      />
    </>
  );
}

function getNodeLevel(node: NetworkNodeType, allNodes: NetworkNodeType[]): number {
  if (!node.parentId) return 0;
  const parent = allNodes.find(n => n.id === node.parentId);
  if (!parent) return 1;
  return getNodeLevel(parent, allNodes) + 1;
}