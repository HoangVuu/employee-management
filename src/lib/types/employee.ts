export interface Image {
    id: number;
    cdnUrl: string;
    displayOrder: number
  }
  
  export interface ToolLanguage {
    id: number;
    toolLanguageResourceId: number;
    displayOrder: number;
    from: number;
    to: number;
    description: string;
    images: Image[];
  }
  
  export interface Position {
    id: number;
    positionResourceId: number;
    displayOrder: number; 
    toolLanguages: ToolLanguage[];
  }
  
  export interface Employee {
    id: number;
    name: string;
    positions: Position[];
    totalExp?: number;
  }
  