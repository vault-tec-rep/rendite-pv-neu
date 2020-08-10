#%%
import numpy as np
kW = 30
breel = np.minimum(10, kW) / kW * 0.1147 \
+ np.minimum(30, kW - np.minimum(10, kW)) / kW * 0.1115 \
+ np.minimum(60, kW - np.minimum(30, kW - np.minimum(10, kW)
                                         ) - np.minimum(10, kW)) / kW * 0.0996

# %%
