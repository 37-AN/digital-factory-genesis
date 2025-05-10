
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for lot tracking and genealogy
export const lotTracking = {
  // Get all lots
  async getAllLots() {
    const { data, error } = await supabase
      .from('lots')
      .select('*');
    
    if (error) throw error;
    return data;
  },
  
  // Get a specific lot by ID
  async getLotById(lotId: string) {
    const { data, error } = await supabase
      .from('lots')
      .select('*')
      .eq('lot_id', lotId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get genealogy for a lot (parent-child relationships)
  async getLotGenealogy(lotId: string) {
    // Get children
    const { data: children, error: childrenError } = await supabase
      .from('genealogy')
      .select('child_lot_id, lots!child_lot_id(*)')
      .eq('parent_lot_id', lotId);
    
    if (childrenError) throw childrenError;
    
    // Get parents
    const { data: parents, error: parentsError } = await supabase
      .from('genealogy')
      .select('parent_lot_id, lots!parent_lot_id(*)')
      .eq('child_lot_id', lotId);
    
    if (parentsError) throw parentsError;
    
    return { parents, children };
  },
  
  // Get scans for a lot
  async getLotScans(lotId: string) {
    const { data, error } = await supabase
      .from('scans')
      .select('*')
      .eq('lot_id', lotId)
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Get quality checks for a lot
  async getQualityChecks(lotId: string) {
    const { data, error } = await supabase
      .from('quality_checks')
      .select('*')
      .eq('lot_id', lotId)
      .order('checked_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Record a new quality check
  async recordQualityCheck(checkData: {
    lot_id: string;
    check_type: string;
    result: string;
    notes?: string;
  }) {
    const { data, error } = await supabase
      .from('quality_checks')
      .insert([{
        lot_id: checkData.lot_id,
        check_type: checkData.check_type,
        result: checkData.result,
        notes: checkData.notes || null,
        checked_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
    return data;
  },
  
  // Record a barcode scan
  async recordScan(scanData: {
    lot_id: string;
    operator_id?: string;
    station_id?: string;
    image_url?: string;
  }) {
    const { data, error } = await supabase
      .from('scans')
      .insert([{
        lot_id: scanData.lot_id,
        timestamp: new Date().toISOString(),
        operator_id: scanData.operator_id || null,
        station_id: scanData.station_id || null,
        image_url: scanData.image_url || null
      }]);
    
    if (error) throw error;
    return data;
  }
};
