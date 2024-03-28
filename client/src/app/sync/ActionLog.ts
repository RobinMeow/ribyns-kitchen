export interface ActionLog {
  createdAt: Date;
  entityId: string;
  source: 'api' | 'local-persistor';
}
