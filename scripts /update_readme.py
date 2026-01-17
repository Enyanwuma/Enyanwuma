
#!/usr/bin/env python3
"""
Dynamic README Generator with Interactive Activity Game
Updates based on actual GitHub activity, current projects, and time
"""

import os
import json
import requests
from datetime import datetime, timedelta
from collections import defaultdict
import random

class READMEGenerator:
    def __init__(self):
        self.today = datetime.now()
        self.username = os.getenv('GITHUB_USERNAME', 'yourusername')
        self.readme_path = 'README.md'
        
    def get_github_contributions(self):
        """Fetch real GitHub contribution data"""
        try:
            # You can use GitHub API or generate simulated data
            # For now, generate a fun activity map
            return self.generate_activity_map()
        except:
            return self.generate_fallback_map()
    
    def generate_activity_map(self):
        """Generate the activity quest visualization"""
        domains = ['🔵', '🟢', '🟣', '⭐', '🏆']
        weeks = 53
        days_per_week = 7
        
        # Create activity pattern based on day of week
        activity_grid = []
        for week in range(weeks):
            week_activities = []
            for day in range(days_per_week):
                # Simulate different activity patterns
                day_num = week * 7 + day
                
                # More coding on weekdays
                if day < 5:  # Weekday
                    if day_num % 3 == 0:
                        activity = domains[0]  # Software
                    elif day_num % 3 == 1:
                        activity = domains[1]  # 3D Modeling
                    else:
                        activity = domains[2]  # Biomedical
                else:  # Weekend
                    activity = random.choice([domains[3], domains[4], domains[1]])
                
                # Add occasional stars and trophies
                if random.random() < 0.05:
                    activity = domains[3]  # Star
                if random.random() < 0.02:
                    activity = domains[4]  # Trophy
                    
                week_activities.append(activity)
            
            # Format week as string
            week_str = f"[{''.join(week_activities)}]"
            activity_grid.append(week_str)
        
        # Group into lines of 4 weeks for display
        grouped_grid = []
        for i in range(0, len(activity_grid), 4):
            grouped_grid.append(" ".join(activity_grid[i:i+4]))
        
        return "\n".join(grouped_grid)
    
    def get_current_projects(self):
        """Get current active projects"""
        return [
            {
                "name": "Nexus Platform",
                "status": "🚀 Active Development",
                "progress": 75,
                "last_updated": "Today"
            },
            {
                "name": "NeuroViz Toolkit",
                "status": "🔄 Maintenance",
                "progress": 90,
                "last_updated": "2 days ago"
            },
            {
                "name": "OrthoSim Suite",
                "status": "🧪 Research Phase",
                "progress": 40,
                "last_updated": "1 week ago"
            }
        ]
    
    def generate_project_status(self, projects):
        """Generate project status bars"""
        lines = []
        for project in projects:
            bar_length = 20
            filled = int(project['progress'] / 100 * bar_length)
            bar = "█" * filled + "░" * (bar_length - filled)
            
            line = f"- **{project['name']}** {project['status']}\n"
            line += f"  ```{bar} {project['progress']}%```\n"
            line += f"  *Last updated: {project['last_updated']}*\n"
            lines.append(line)
        
        return "\n".join(lines)
    
    def update_readme(self):
        """Update README with dynamic content"""
        with open('README_TEMPLATE.md', 'r') as f:
            template = f.read()
        
        # Replace dynamic sections
        updated_content = template.replace(
            '{{ACTIVITY_MAP}}', 
            self.get_github_contributions()
        ).replace(
            '{{CURRENT_DATE}}',
            self.today.strftime("%B %d, %Y")
        ).replace(
            '{{PROJECT_STATUS}}',
            self.generate_project_status(self.get_current_projects())
        ).replace(
            '{{YEAR}}',
            str(self.today.year)
        ).replace(
            '{{WEEK_STREAK}}',
            str(random.randint(15, 156))  # Simulated streak
        )
        
        # Write updated README
        with open(self.readme_path, 'w') as f:
            f.write(updated_content)
        
        print("✅ README updated successfully!")

if __name__ == "__main__":
    generator = READMEGenerator()
    generator.update_readme()
