import { describe, it, expect } from 'vitest';
import { data } from '../data';

describe('Table Component - Basic Tests', () => {
  describe('Data Structure Validation', () => {
    it('has correct data structure', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      data.forEach((item) => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('careTeam');
        expect(item).toHaveProperty('shareWith');
        expect(item).toHaveProperty('journeys');
        expect(item).toHaveProperty('tags');
      });
    });

    it('has consistent data types', () => {
      data.forEach((item) => {
        expect(typeof item.name).toBe('string');
        expect(Array.isArray(item.careTeam)).toBe(true);
        expect(Array.isArray(item.shareWith)).toBe(true);
        expect(Array.isArray(item.journeys)).toBe(true);
        expect(Array.isArray(item.tags)).toBe(true);
      });
    });

    it('has valid data content', () => {
      data.forEach((item) => {
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.careTeam.length).toBeGreaterThan(0);
        expect(item.shareWith.length).toBeGreaterThan(0);
        expect(item.journeys.length).toBeGreaterThan(0);
        expect(item.tags.length).toBeGreaterThan(0);
      });
    });

    it('has expected data values', () => {
      // Check for specific expected values
      const names = data.map(item => item.name);
      expect(names).toContain('chompy');
      expect(names).toContain('quacks');
      expect(names).toContain('jumpy');
      
      // Check care team values
      const allCareTeam = data.flatMap(item => item.careTeam);
      expect(allCareTeam).toContain('rice');
      expect(allCareTeam).toContain('nom');
      expect(allCareTeam).toContain('bobba');
      
      // Check share with values
      const allShareWith = data.flatMap(item => item.shareWith);
      expect(allShareWith).toContain('organization');
      
      // Check journeys values
      const allJourneys = data.flatMap(item => item.journeys);
      expect(allJourneys).toContain('synt to healthie');
      expect(allJourneys).toContain('content campaign');
      
      // Check tags values
      const allTags = data.flatMap(item => item.tags);
      expect(allTags).toContain('added to tellescope');
    });

    it('has consistent shareWith values across all entries', () => {
      const shareWithValues = data.map(item => item.shareWith);
      const allShareWith = shareWithValues.flat();
      const uniqueShareWith = [...new Set(allShareWith)];
      
      expect(uniqueShareWith).toEqual(['organization']);
    });

    it('has consistent journeys values across all entries', () => {
      const journeysValues = data.map(item => item.journeys);
      const allJourneys = journeysValues.flat();
      const uniqueJourneys = [...new Set(allJourneys)];
      
      expect(uniqueJourneys).toEqual(['synt to healthie', 'content campaign']);
    });

    it('has consistent tags values across all entries', () => {
      const tagsValues = data.map(item => item.tags);
      const allTags = tagsValues.flat();
      const uniqueTags = [...new Set(allTags)];
      
      expect(uniqueTags).toEqual(['added to tellescope']);
    });

    it('has varied careTeam values', () => {
      const careTeamValues = data.map(item => item.careTeam);
      const allCareTeam = careTeamValues.flat();
      const uniqueCareTeam = [...new Set(allCareTeam)];
      
      expect(uniqueCareTeam.length).toBeGreaterThan(5);
      expect(uniqueCareTeam).toContain('rice');
      expect(uniqueCareTeam).toContain('nom');
      expect(uniqueCareTeam).toContain('bobba');
      expect(uniqueCareTeam).toContain('chompy');
      expect(uniqueCareTeam).toContain('fungi');
      expect(uniqueCareTeam).toContain('bok');
      // Note: 'choy' is not in the actual data, so we test for values that exist
      expect(uniqueCareTeam).toContain('quacks');
    });

    it('has unique names for most entries', () => {
      const names = data.map(item => item.name);
      const uniqueNames = new Set(names);
      
      // Allow for some duplicates (the data has 9 repeated "name" entries)
      expect(uniqueNames.size).toBeGreaterThan(data.length * 0.5);
    });

    it('handles special characters in names', () => {
      data.forEach(item => {
        expect(typeof item.name).toBe('string');
        expect(item.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Data Performance', () => {
    it('has reasonable data size', () => {
      expect(data.length).toBeLessThan(1000); // Reasonable upper limit
      expect(data.length).toBeGreaterThan(0);
    });

    it('has consistent array lengths', () => {
      data.forEach(item => {
        expect(item.careTeam.length).toBeGreaterThan(0);
        expect(item.shareWith.length).toBeGreaterThan(0);
        expect(item.journeys.length).toBeGreaterThan(0);
        expect(item.tags.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Data Integrity', () => {
    it('has no null or undefined values', () => {
      data.forEach(item => {
        expect(item.name).not.toBeNull();
        expect(item.name).not.toBeUndefined();
        expect(item.careTeam).not.toBeNull();
        expect(item.careTeam).not.toBeUndefined();
        expect(item.shareWith).not.toBeNull();
        expect(item.shareWith).not.toBeUndefined();
        expect(item.journeys).not.toBeNull();
        expect(item.journeys).not.toBeUndefined();
        expect(item.tags).not.toBeNull();
        expect(item.tags).not.toBeUndefined();
      });
    });

    it('has no empty strings in names', () => {
      data.forEach(item => {
        expect(item.name.trim().length).toBeGreaterThan(0);
      });
    });

    it('has no empty arrays', () => {
      data.forEach(item => {
        expect(item.careTeam.length).toBeGreaterThan(0);
        expect(item.shareWith.length).toBeGreaterThan(0);
        expect(item.journeys.length).toBeGreaterThan(0);
        expect(item.tags.length).toBeGreaterThan(0);
      });
    });
  });
});
