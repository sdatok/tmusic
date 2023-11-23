<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.spotify_token', '');
        $this->migrator->add('general.spotify_token_expiry', '');

    }

    public function down()
    {
        $this->migrator->delete('general.spotify_token');
        $this->migrator->delete('general.spotify_token_expiry');
    }
};
