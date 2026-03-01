-- [[ Installation ]] --
-- 1. Insert the sql.sql to your database
-- 2. Configurate the zones
-- 3. put in to you cfg: ensure ac_ffa

-- [[ Check if player is in FFA ]]--
-- client:
local isFFA = exports['ac_ffa']:isFFA()
--server:
local isFFA = exports['ac_ffa']:isFFA(source)