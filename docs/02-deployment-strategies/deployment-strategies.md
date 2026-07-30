\# Deployment Strategies



\## Objective



This document explains deployment approaches used to achieve zero downtime in banking applications.



\---



\# 1. Rolling Update



\### Description

\- Gradually replaces old application instances with new ones.

\- Maintains application availability during deployment.



\### Advantages

\- No complete downtime

\- Simple implementation

\- Default Kubernetes deployment strategy



\### Limitations

\- Rollback can take time

\- Mixed application versions may run simultaneously



\---



\# 2. Blue-Green Deployment



\### Description

\- Two identical production environments are maintained:

&#x20; - Blue (Current Production)

&#x20; - Green (New Version)



Traffic is switched only after successful validation.



\### Advantages



\- Near zero downtime

\- Easy rollback

\- Reduced deployment risk



\### Limitations



\- Higher infrastructure cost

\- Requires duplicate environments



\---



\# 3. Canary Deployment



\### Description



A small percentage of users receive the new version first. If no issues are detected, traffic is gradually increased.



\### Advantages



\- Lower production risk

\- Early issue detection

\- Better user experience



\### Limitations



\- Requires traffic management

\- More complex monitoring



\---



\# Recommended Strategy



For banking applications:



\- Blue-Green Deployment for major releases

\- Canary Deployment for gradual rollouts

\- Rolling Updates for routine maintenance



\---



\# Conclusion



Combining these deployment strategies enables secure, highly available, and zero-downtime software releases while minimizing operational risk.

